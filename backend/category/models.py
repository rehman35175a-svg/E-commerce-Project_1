from django.db import models

# Create your models here.
class Category(models.Model):
    Cate_Name = models.CharField(max_length=100, unique=True)
    SLug = models.SlugField(max_length=100, unique=True)
    Cate_Des = models.TextField(max_length=200, blank=True)
    Cate_Img = models.ImageField(upload_to='media/categories', blank=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.Cate_Name