from store.models import *
from rest_framework import serializers
from category.serializers import CategorySerializer




class ProductGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductGallery
        fields = ['id', 'image']


class ProductSerializer(serializers.ModelSerializer):
    category_key = CategorySerializer(read_only=True)
    gallery_images = ProductGallerySerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

    