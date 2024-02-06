from django.db import models
from UserAPI.models import User


class sensorData(models.Model):
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    latter = models.CharField(max_length = 100, null = False)
    #gyro
    gyroX = models.FloatField(null = False)
    gyroY = models.FloatField(null = False)
    gyroZ = models.FloatField(null = False)
    #accel
    accelX = models.FloatField(null = False)
    accelY = models.FloatField(null = False)
    accelZ = models.FloatField(null = False)
   
    def __str__(self):
        return self.latter
