import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone_number = models.IntegerField(null=True, default=None)
    street = models.CharField(max_length=250, null=True, default=None)
    suburb = models.CharField(max_length=250, null=True, default=None)
    city = models.CharField(max_length=250, null=True, default=None)
    region = models.CharField(max_length=250, null=True, default=None)
    country = models.CharField(max_length=250, null=True, default=None)
    zip_code = models.IntegerField(null=True, default=None)

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'users'
        app_label= 'application'
