from rest_framework import viewsets
from application.models import Users
from application.serializers import UsersSerializers

class UsersView(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializers