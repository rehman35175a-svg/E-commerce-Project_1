from django.contrib import admin
from django.utils.html import mark_safe  
from .models import *
# Register your models here.

class ProductGalleryInline(admin.TabularInline):
    model = ProductGallery
    extra = 3 

class ProductAdmin(admin.ModelAdmin):
    list_display = ('Product_name','category_name', 'slug', 'image_tag', 'price', 'stock', 'is_available', 'created_date', 'modified_date')
    prepopulated_fields = {'slug': ('Product_name',)}
    inlines = [ProductGalleryInline] 

    

    def image_tag(self, obj):

        return mark_safe(
            f'<img src="{obj.image.url}" width="50" height="50" />'
        )

    image_tag.short_description = 'Image'

    def category_name(self, obj):
        return obj.category_key

    category_name.short_description = 'Category'

admin.site.register(Product, ProductAdmin)    