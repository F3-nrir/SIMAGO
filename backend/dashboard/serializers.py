from rest_framework import serializers
from .models import RecProduct, RecArea, RecRegister

class Serializer_RecProduct(serializers.ModelSerializer):
    class Meta:
        model = RecProduct
        fields = '__all__'

class Serializer_RecArea(serializers.ModelSerializer):
    class Meta:
        model = RecArea
        fields = '__all__'

class Serializer_RecRegister(serializers.ModelSerializer):
    class Meta:
        model = RecRegister
        fields = '__all__'