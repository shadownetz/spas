# Generated by Django 3.2.2 on 2021-05-14 00:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='subject',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='messagethread',
            name='subject',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
