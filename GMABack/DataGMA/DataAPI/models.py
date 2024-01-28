from django.db import models
from UserAPI.models import User

class textData(models.Model):
    textID = models.AutoField(primary_key=True)
    text = models.TextField(null = False)

    def __str__(self):
        return self.text
    
class textDataUser(models.Model):
    textID = models.ForeignKey(textData, on_delete=models.CASCADE)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    collectedText = models.TextField(null = False)
    collectedTime = models.FloatField(null = False)

    def __str__(self):
        return self.collectedText

class sensorData(models.Model):
    textID = models.ForeignKey(textData, on_delete=models.CASCADE)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    #gyro
    gyroX = models.FloatField(null = False)
    gyroY = models.FloatField(null = False)
    gyroZ = models.FloatField(null = False)
    #accel
    accelX = models.FloatField(null = False)
    accelY = models.FloatField(null = False)
    accelZ = models.FloatField(null = False)
   
    def __str__(self):
        return self.textID
