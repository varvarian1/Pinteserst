from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_delete
import os

class Photos(models.Model):
    Name = models.CharField(max_length=50)
    Photo = models.ImageField(upload_to='photos/')
    Description = models.CharField(max_length=200)
    Tags = models.CharField(max_length=200)

    def __str__(self):
        return self.Name

@receiver(post_delete, sender=Photos)
def delete_photo_file(sender, instance, **kwargs):
    file_path = instance.Photo.path
    if os.path.exists(file_path):
        os.remove(file_path)