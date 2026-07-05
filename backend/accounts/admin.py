from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

# Register your models here.
class AccountAdmin(UserAdmin):
    list_display = ('name', 'email', 'join_Date', 'last_Login', 'is_admin')
    list_display_links = ('name', 'email')  # clickable columns
    readonly_fields = ('join_Date', 'last_Login', 'is_admin')   # non-editable fields

    ordering = ('join_Date',)  #Ascending order     oldest users first
 #  ordering = ('-join_Date',)  #Decending order    newest users first


    filter_horizontal = ()
    list_filter = ()    #sidebar filters
 #  list_filter = ('is_admin',)    #sidebar specific filters
    fieldsets = ()

admin.site.register(Account, AccountAdmin)