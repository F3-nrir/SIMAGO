# Generated by Django 5.0.3 on 2024-03-30 21:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recarea',
            name='area_name',
        ),
    ]
