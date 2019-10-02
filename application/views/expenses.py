from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from application.models import Expenses, Users
from application.serializers import *

class ExpenseView(viewsets.ModelViewSet):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializers

class CountPerDayView(generics.ListAPIView):
    serializer_class = DailySerilizers

    def list(self, request):
        daily_objects = Expenses.objects.count_per_day()
        serializer = DailySerilizers(daily_objects, many=True)
        return Response(serializer.data)

class CountPerWeekView(generics.ListAPIView):
    serializer_class = WeeklySerilizers

    def list(self, request):
        weekly_objects = Expenses.objects.count_per_week()
        serializer = WeeklySerilizers(weekly_objects, many=True)
        return Response(serializer.data)


class CountPerMonthView(generics.ListAPIView):
    serializer_class = MonthlySerilizers

    def list(self, request):
        monthly_objects = Expenses.objects.count_per_month()
        serializer = MonthlySerilizers(monthly_objects, many=True)
        return Response(serializer.data)

class CountPerYearView(generics.ListAPIView):
    serializer_class = YearlySerilizers

    def list(self, request):
        year_objects = Expenses.objects.count_per_year()
        serializer = YearlySerilizers(year_objects, many=True)
        return Response(serializer.data)

class CountByTitleView(generics.ListAPIView):
    serializer_class = TitleSerilizers

    def list(self, request):
        title_objects = Expenses.objects.count_by_title()
        serializer = TitleSerilizers(title_objects, many=True)
        return Response(serializer.data)

class CountByTitleMonthlyView(generics.ListAPIView):
    serializer_class = TitleMonthlySerilizers

    def list(self, request):
        title_monthly_objects = Expenses.objects.count_by_title_monthly()
        serializer = TitleMonthlySerilizers(title_monthly_objects, many=True)
        return Response(serializer.data)

class CountByTitleYearlyView(generics.ListAPIView):
    serializer_class = TitleYearlySerilizers

    def list(self, request):
        title_yearly_objects = Expenses.objects.count_by_title_yearly()
        serializer = TitleYearlySerilizers(title_yearly_objects, many=True)
        return Response(serializer.data)


class DataRepports(generics.ListAPIView):

    def list(self, request):
        combiningData = {
            "daily": Expenses.objects.count_per_day(),
            "weekly":  Expenses.objects.count_per_week(),
            "monthly":  Expenses.objects.count_per_month(),
            "yearly": Expenses.objects.count_per_year(),
            "title":  Expenses.objects.count_by_title(),
            "title_monthly": Expenses.objects.count_by_title_monthly(),
            "title_yearly": Expenses.objects.count_by_title_yearly(),
        }
        return Response(combiningData)



   