from store.models import Product
from rest_framework import serializers
from category.serializers import CategorySerializer

class ProductSerializer(serializers.ModelSerializer):
    category_key = CategorySerializer(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

    