from django.db import models
from rest_framework import serializers, generics

# Create your models here.
class User(models.Model):
    user_id=models.CharField(max_length=11, primary_key=True, unique=True, editable=False)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    role = models.CharField(max_length=20)
    def __str__(self) -> str:
        return self.username

class Serializer_User(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
class UserListCreate(generics.ListCreateAPIView):     
    queryset = User.objects.all()     
    serializer_class = Serializer_User