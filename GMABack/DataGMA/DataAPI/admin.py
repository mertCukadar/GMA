from django.contrib import admin
from .models import sensorData


# Register your models here.

class MemberAdmin(admin.ModelAdmin):
    list_display = ('UserID', 'latter', 'gyroX', 'gyroY', 'gyroZ', 'accelX', 'accelY', 'accelZ')
    list_filter = ['latter']
    search_fields = ['latter']

admin.site.register(sensorData, MemberAdmin)