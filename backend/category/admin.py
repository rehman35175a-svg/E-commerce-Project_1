from django.contrib import admin
from django.utils.html import mark_safe
from .models import *
# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'SLug': ('Cate_Name',)}
    list_display = ('Cate_Name', 'SLug', 'image_tag')
    
    def image_tag(self, obj):

        return mark_safe(
            f'<img src="{obj.Cate_Img.url}" width="50" height="50" />'
        )

    image_tag.short_description = 'Image'

admin.site.register(Category, CategoryAdmin)