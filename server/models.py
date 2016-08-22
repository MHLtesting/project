from __future__ import unicode_literals

from django.db import models

# Create your models here.


class CodeAdress(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class StudentCodes(models.Model):
    name = models.CharField(max_length=100)
    file = models.FileField()

    def __str__(self):
        return self.name

