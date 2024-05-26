from django.db import models

class Registration(models.Model):
    User_Photo = models.ImageField(upload_to='user_photos/', default='account_circle_FILL0_wght400_GRAD0_opsz24.png')
    User_Name = models.CharField(max_length=20)
    Password = models.CharField(max_length=40)
    Email = models.EmailField(max_length=30)

    def __str__(self):
        return self.User_Name
    
