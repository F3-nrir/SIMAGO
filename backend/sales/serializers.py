from rest_framework import serializers
from sales.models import Register, Facture, FactureProduct

class Serializer_Register(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = '__all__'
        
class Serializer_Facture(serializers.ModelSerializer):
    class Meta:
        model = Facture
        fields = '__all__'
        
class Serializer_FactureProduct(serializers.ModelSerializer):
    class Meta:
        model = FactureProduct
        fields = '__all__'