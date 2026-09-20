from django.db import models
from category.models import Category

# Create your models here.
class Product(models.Model):
    category_key = models.ForeignKey(Category, on_delete=models.CASCADE)
    Product_name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(max_length=500, blank=True)
    price = models.IntegerField()
    image = models.ImageField(upload_to = 'media/products')
    stock = models.IntegerField()
    is_available = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add= True)
    modified_date = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.Product_name


class ProductGallery(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="gallery_images")
    image = models.ImageField(upload_to='media/products/gallery')

    def __str__(self):
        # return f"Image for {self.product.Product_name}"
        return self.product.Product_name