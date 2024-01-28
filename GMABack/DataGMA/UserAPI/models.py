from django.db import models

# Create your models here.
class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    age = models.IntegerField(null = False)
    gender = models.CharField(max_length=10, null = False)

  
