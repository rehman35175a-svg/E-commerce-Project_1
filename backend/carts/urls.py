from django.urls import path
from .views import *

urlpatterns = [
 
path('', CartItems.as_view()),
path('get/<int:product_id>/', CartItems.as_view()),
path('<int:product_id>/', AddToCartView.as_view()),
path('calculation/', CartCalculation.as_view()),
path('remove_cart/<int:product_id>/', RemoveFromCartView.as_view()),
path('remove_cart_item/<int:product_id>/', RemoveCartItemView.as_view()),

   
]