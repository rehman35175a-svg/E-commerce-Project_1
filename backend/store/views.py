from django.shortcuts import get_object_or_404
from rest_framework import generics
from store.models import Product
from category.models import Category
from .serializers import ProductSerializer

class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):

        category_slug = self.kwargs.get('category_slug')
       

        if category_slug:
            category = get_object_or_404(Category, SLug=category_slug)
            return Product.objects.filter(category_key=category, is_available=True)

        return Product.objects.all().filter(is_available=True)


class SingleProduct(generics.RetrieveAPIView):
    serializer_class = ProductSerializer

    def get_object(self):
        category_slug = self.kwargs.get('category_slug')
        product_slug = self.kwargs.get('product_slug')
        
        category = get_object_or_404(Category, SLug=category_slug)

        product = get_object_or_404(Product, category_key=category, slug=product_slug, is_available=True )
        
        return product