from rest_framework import serializers
from registration.models import Registration
from create.models import Photos

from django.contrib.auth.models import User

class PhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photos
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user