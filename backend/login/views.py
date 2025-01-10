from django.shortcuts import render
from .models import *

# Create your views here.
def CreateUser(username, password, role):
    user = User()
    user.username = username
    user.password = password
    user.role = role
    return user.save()

def ReadUsers(username, user_id, role):
    if user_id!= None:
        user = User.objects.get(user_id=user_id)
    elif username!= None :
        if role!= None:
            user = User.objects.get(username=username, role=role)
        else:
            user = User.objects.get(username=username)
    elif role!= None:
        user = User.objects.filter(role=role)
    else:
        user = User.objects.all()
    return user

def UpdateUser(user_id, username, password, role):
    user = User.objects.get(user_id=user_id)
    if username!= None:
        user.username=username
    if password!= None:
        user.password=password
    if role!= None:
        user.role=role
    user.save()

def DeleteUser(user_id, username):
    if user_id!= None:
        user = User.objects.get(user_id=user_id)
    else:
        user = User.objects.get(username=username)
    user.delete()