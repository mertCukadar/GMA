#import serializers
from rest_framework import serializers
from .models import sensorData

class sensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = sensorData
        fields = '__all__'
