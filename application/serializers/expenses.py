from rest_framework import serializers
from application.models import Expenses

class ExpensesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = [
            "id",
            "user",
            "title",
            "amount",
            "created_at",
            "updated_at",
            "deleted_at",
            "is_active",
            "timestamp"
        ]
        read_only_fields = ["id", "is_active", "timestamp"]

class DailySerilizers(serializers.Serializer):
    day = serializers.DateField()
    count = serializers.IntegerField()
    total = serializers.FloatField()

class WeeklySerilizers(serializers.Serializer):
    week = serializers.DateField()
    count = serializers.IntegerField()
    total = serializers.FloatField()

class MonthlySerilizers(serializers.Serializer):
    month = serializers.DateField()
    count = serializers.IntegerField()
    total = serializers.FloatField()

class YearlySerilizers(serializers.Serializer):
    year = serializers.DateField()
    count = serializers.IntegerField()
    total = serializers.FloatField()

class TitleSerilizers(serializers.Serializer):
    title = serializers.DateField()
    count = serializers.IntegerField()
    total = serializers.FloatField()

class TitleMonthlySerilizers(serializers.Serializer):
    title = serializers.DateField()
    month = serializers.DateField()
    count = serializers.IntegerField()
    total = serializers.FloatField()

class TitleYearlySerilizers(serializers.Serializer):
    title = serializers.DateField()
    year = serializers.DateField()
    count = serializers.IntegerField()
    total = serializers.FloatField()