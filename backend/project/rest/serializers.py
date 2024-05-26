from rest_framework import serializers
from registration.models import Registration
from create.models import Photos

class PhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photos
        fields = ['id', 'Name', 'Photo', 'Description', 'Tags']

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'
