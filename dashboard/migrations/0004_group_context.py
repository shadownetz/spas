# Generated by Django 3.2.2 on 2021-05-14 01:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0003_auto_20210514_0024'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='context',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]