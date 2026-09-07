from django.shortcuts import get_object_or_404
from rest_framework import generics, filters
from store.models import Product
from category.models import Category
from .serializers import ProductSerializer

class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['Product_name', 'description']

    def get_queryset(self):
        category_slug = self.kwargs.get('category_slug')
        queryset = Product.objects.filter(is_available=True)

        if category_slug:
            category = get_object_or_404(Category, SLug=category_slug)
            queryset = queryset.filter(category_key=category)

        # ---------- Price Filter ----------

        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        return queryset

        


class SingleProduct(generics.RetrieveAPIView):
    serializer_class = ProductSerializer

    def get_object(self):
        category_slug = self.kwargs.get('category_slug')
        product_slug = self.kwargs.get('product_slug')
        
        category = get_object_or_404(Category, SLug=category_slug)

        product = get_object_or_404(Product, category_key=category, slug=product_slug, is_available=True )
        
        return product