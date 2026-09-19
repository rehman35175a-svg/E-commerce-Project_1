import uuid
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .utils import send_order_confirmation_email
from .models import Address, Order, OrderProduct
from .serializers import *
from carts.views import CartCreation
from carts.models import CartItem


# ------------------- ADDRESS MANAGEMENT -------------------
class AddressListCreateView(ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user).order_by('-is_default', '-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AddressDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)


# ------------------- CHECKOUT SUMMARY -------------------
class CheckoutSummaryView(CartCreation):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart = self.get_cart(request)
        cart_items = CartItem.objects.filter(cart=cart, is_active=True)

        if not cart_items.exists():
            return Response({"message": "Your cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        items = []
        for item in cart_items:
            product = item.product
            out_of_stock = (not product.is_available) or (item.quantity > product.stock)

            items.append({
                "cart_item_id": item.id,
                "product_id": product.id,
                "product_name": product.Product_name,
                "image": product.image.url if product.image else None,
                "price": product.price,
                "quantity": item.quantity,
                "available_stock": product.stock,
                "sub_total": item.sub_total(),
                "out_of_stock": out_of_stock,
            })

        valid_items = [i for i in items if not i["out_of_stock"]]
        total = sum(i["sub_total"] for i in valid_items)
        tax = round((2 * total) / 100)
        grand_total = total + tax

        addresses = Address.objects.filter(user=request.user).order_by('-is_default', '-created_at')

        return Response({
            "items": items,
            "total": total,
            "tax": tax,
            "grand_total": grand_total,
            "has_out_of_stock": len(valid_items) != len(items),
            "addresses": AddressSerializer(addresses, many=True).data,
        })


# ------------------- PLACE ORDER -------------------
class PlaceOrderView(CartCreation):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PlaceOrderSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        cart = self.get_cart(request)

        self.validate_cart_items(cart)
        cart_items = CartItem.objects.filter(cart=cart, is_active=True)

        if not cart_items.exists():
            return Response({"message": "Your cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        if data.get('address_id'):
            address = get_object_or_404(Address, id=data['address_id'], user=request.user)
        else:
            address = Address.objects.create(
                user=request.user,
                full_name=data['full_name'],
                phone=data['phone'],
                address_line=data['address_line'],
                city=data['city'],
                state=data.get('state', ''),
                postal_code=data.get('postal_code', ''),
                country=data.get('country', 'Pakistan'),
                is_default=data.get('save_address', False),
            )

        total = sum(item.product.price * item.quantity for item in cart_items)
        tax = round((2 * total) / 100)
        grand_total = total + tax

        payment_method = data['payment_method']

        with transaction.atomic():
            order = Order.objects.create(
                user=request.user,
                address=address,
                order_number=f"ORD-{uuid.uuid4().hex[:10].upper()}",
                payment_method=payment_method,
                payment_status='PENDING',
                total=total,
                tax=tax,
                grand_total=grand_total,
            )

            for item in cart_items:
                if item.quantity > item.product.stock:
                    transaction.set_rollback(True)
                    return Response(
                        {"message": f"{item.product.Product_name} has insufficient stock."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                OrderProduct.objects.create(
                    order=order,
                    product=item.product,
                    product_name=item.product.Product_name,
                    price=item.product.price,
                    quantity=item.quantity,
                )

                item.product.stock -= item.quantity
                item.product.save()

            cart_items.update(is_active=False)

        # ---------- Order confirmation email — order create hone ke baad ----------
        try:
            send_order_confirmation_email(order)
        except Exception as e:
            print(f"Failed to send order confirmation email: {e}")

        payment_info = {}
        if payment_method in ['JAZZCASH', 'EASYPAISA']:
            payment_info = {
                "requires_redirect": True,
                "gateway": payment_method,
                "order_number": order.order_number,
                "amount": str(grand_total),
            }
        elif payment_method == 'BANK':
            payment_info = {
                "requires_redirect": False,
                "bank_details": {
                    "bank_name": "Meezan Bank",
                    "account_title": "GreatKart Pvt Ltd",
                    "account_number": "1234567890123",
                    "iban": "PK00MEZN0000000123456789",
                },
                "note": "Please transfer the amount and contact support with your Order Number.",
            }

        return Response({
            "message": "Order placed successfully.",
            "order": OrderSerializer(order).data,
            "payment_info": payment_info,
        }, status=status.HTTP_201_CREATED)


# ------------------- ORDER HISTORY / DETAIL -------------------
class OrderListView(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_number):
        order = get_object_or_404(Order, order_number=order_number, user=request.user)
        return Response(OrderSerializer(order).data)