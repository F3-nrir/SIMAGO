from django.urls import path, include
from rest_framework import routers
from sales import views

routerFacture=routers.DefaultRouter()
routerFacture.register(r'', views.FactureView, 'factures')
routerRegister=routers.DefaultRouter()
routerRegister.register(r'', views.RegisterView,'registers')
routerFP=routers.DefaultRouter()
routerFP.register(r'', views.FactureProductView, 'facture-products')


urlpatterns = [
    path('sales/', include(routerFacture.urls)),
    path('registers/', include(routerRegister.urls)),
    path('facture-products/', include(routerFP.urls)),
]