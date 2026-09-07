from .models import *
from store.models import *  
from .serializers import *
from rest_framework import generics, status
from django import shortcuts
from rest_framework.response import Response


class CartCreation(generics.GenericAPIView):
    def _cart_id(self, request):
        cart = request.session.session_key
        if not cart:
            request.session.create()
            cart = request.session.session_key
        return cart

    # Shared helper — reused by CartCalculation, AddToCartView, RemoveFromCartView etc.
    def get_cart_summary(self, request):
        total = 0
        quantity = 0

        cart = shortcuts.get_object_or_404(Cart, cart_id=self._cart_id(request))
        cart_items = CartItem.objects.filter(cart=cart, is_active=True)

        for item in cart_items:
            total += item.product.price * item.quantity
            quantity += item.quantity

        tax = (2 * total) / 100
        grand_total = total + tax

        serializer = CartItemSerializer(cart_items, many=True)

        return {
            "items": serializer.data,
            "total": total,
            "quantity": quantity,
            "tax": tax,
            "grand_total": grand_total,
        }


class CartItems(CartCreation, generics.ListAPIView):         
    serializer_class = CartItemSerializer


    def get_queryset(self):
        product_id = self.kwargs.get('product_id')

        cart = Cart.objects.filter(cart_id=self._cart_id(self.request)).first()
        if not cart:
            return CartItem.objects.none()

        if product_id:
            product = shortcuts.get_object_or_404(Product, id=product_id)
            return CartItem.objects.filter(product_id=product, cart_id=cart.id, is_active=True)

        return CartItem.objects.filter(cart_id=cart.id, is_active=True)


class AddToCartView(CartCreation):

    serializer_class = CartItemSerializer

    def addToCart(self, request):
        product_id = self.kwargs.get('product_id')
        product = shortcuts.get_object_or_404(Product, id=product_id)

        cart, cart_created = Cart.objects.get_or_create(cart_id=self._cart_id(request))
        cart_item, item_created = CartItem.objects.get_or_create(
            product=product, cart=cart, defaults={"quantity": 1}
        )

        if not item_created:
            if cart_item.quantity >= product.stock:
                return Response(
                    {"message": "Only limited stock is available!"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            cart_item.quantity += 1
            cart_item.save()

        return cart_item

    def post(self, request, *args, **kwargs):
        result = self.addToCart(request)

        if isinstance(result, Response):
            return result

        # Return the full updated cart summary so frontend can refresh totals in one call
        return Response(self.get_cart_summary(request))


class CartCalculation(CartCreation):

    def get(self, request, *args, **kwargs):
        return Response(self.get_cart_summary(request))


class RemoveFromCartView(CartCreation):
    """Decreases quantity by 1. Deletes item if quantity reaches 0."""

    def post(self, request, *args, **kwargs):
        product_id = self.kwargs.get('product_id')

        cart = shortcuts.get_object_or_404(Cart, cart_id=self._cart_id(request))
        product = shortcuts.get_object_or_404(Product, id=product_id)
        cart_item = shortcuts.get_object_or_404(CartItem, product=product, cart=cart)

        if cart_item.quantity > 1:
            cart_item.quantity -= 1
            cart_item.save()
        else:
            cart_item.delete()

        return Response(self.get_cart_summary(request))


class RemoveCartItemView(CartCreation):
    """Deletes the item entirely, regardless of quantity."""

    def post(self, request, *args, **kwargs):
        product_id = self.kwargs.get('product_id')

        cart = shortcuts.get_object_or_404(Cart, cart_id=self._cart_id(request))
        product = shortcuts.get_object_or_404(Product, id=product_id)
        cart_item = shortcuts.get_object_or_404(CartItem, product=product, cart=cart)

        cart_item.delete()

        return Response(self.get_cart_summary(request))