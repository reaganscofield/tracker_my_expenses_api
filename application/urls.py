from django.urls import path, include
from rest_framework import routers
from .views import UsersView, ExpenseView

router = routers.DefaultRouter()

router.register('user', UsersView)
router.register('expense', ExpenseView)

urlpatterns = [
    path('', include(router.urls))
]
