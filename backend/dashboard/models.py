from django.db import models

# Create your models here.
class RecProduct(models.Model):
    recProduct_id=models.AutoField(primary_key=True, editable=False)
    Cant_product=models.IntegerField()
    productTotal_price=models.FloatField()
    product_id=models.IntegerField()
    product_name=models.CharField(max_length=20)
    recProduct_date=models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.recProduct_id
    
class RecArea(models.Model):
    recArea_id=models.AutoField(primary_key=True, editable=False)
    cant_area=models.IntegerField()
    areaTotal_price=models.FloatField()
    area_id=models.IntegerField()
    recArea_date=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.recArea_id
    
class RecRegister(models.Model):
    recRegister_id=models.AutoField(primary_key=True, editable=False)
    cant_register=models.IntegerField()
    registerTotal_price=models.FloatField()
    register_id=models.IntegerField()
    recRegister_date=models.DateField(auto_now_add=True)
    def __str__(self):
        return self.recRegister_id