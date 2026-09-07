from .models import *
from rest_framework import serializers
from store.serializers import ProductSerializer

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    sub_total = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = '__all__'

    def get_sub_total(self, obj):
        return obj.sub_total()