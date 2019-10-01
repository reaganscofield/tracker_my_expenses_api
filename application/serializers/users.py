from rest_framework import serializers
from application.models import Users

class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = [ 
            "id", 
            "email", 
            "username", 
            "first_name", 
            "last_name", 
            "phone_number", 
            "zip_code",
            "street", 
            "suburb", 
            "city", 
            "country", 
            "region",
            "password" 
        ]
        read_only_fields = ["id"]
        extra_kwargs = {'password': {'write_only': True}}