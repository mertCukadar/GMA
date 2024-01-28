from django.contrib import admin
from .models import textData , textDataUser , sensorData


# Register your models here.
admin.site.register(textData)
admin.site.register(textDataUser)
admin.site.register(sensorData)