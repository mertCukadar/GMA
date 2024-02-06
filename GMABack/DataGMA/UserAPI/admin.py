from django.contrib import admin
from .models import User

# Register your models here.

class MemberAdmin(admin.ModelAdmin):
    list_display = ('UserID', 'age', 'gender')
    list_filter = ['UserID']
    search_fields = ['gender']

admin.site.register(User, MemberAdmin)