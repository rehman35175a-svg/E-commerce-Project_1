from django.urls import path
from .views import *

urlpatterns = [
    
    path('', ProductList.as_view()),
    path('<slug:category_slug>/', ProductList.as_view()),
    path('<slug:category_slug>/<slug:product_slug>/', SingleProduct.as_view()),
   
]