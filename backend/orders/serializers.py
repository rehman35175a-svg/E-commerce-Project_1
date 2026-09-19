from rest_framework import serializers
from .models import Address, Order, OrderProduct


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'full_name', 'phone', 'address_line', 'city', 'state', 'postal_code', 'country', 'is_default']


class OrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ['id', 'product', 'product_name', 'price', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderProductSerializer(many=True, read_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'address', 'payment_method', 'payment_status',
            'transaction_id', 'status', 'total', 'tax', 'grand_total',
            'created_at', 'items',
        ]


class PlaceOrderSerializer(serializers.Serializer):
    address_id = serializers.IntegerField(required=False)
    full_name = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    address_line = serializers.CharField(required=False)
    city = serializers.CharField(required=False)
    state = serializers.CharField(required=False, allow_blank=True)
    postal_code = serializers.CharField(required=False, allow_blank=True)
    country = serializers.CharField(required=False, default="Pakistan")
    save_address = serializers.BooleanField(required=False, default=False)

    payment_method = serializers.ChoiceField(choices=['COD', 'JAZZCASH', 'EASYPAISA', 'BANK'])

    def validate(self, data):
        if not data.get('address_id') and not data.get('address_line'):
            raise serializers.ValidationError("Either select a saved address or provide a new one.")
        return data