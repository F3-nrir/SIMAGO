from rest_framework import serializers
from inventory.models import Product, Area

class Serializer_Product(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class Serializer_Area(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'
        
    
