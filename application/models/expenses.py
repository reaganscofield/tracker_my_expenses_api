import uuid
from django.db import models
from django.db.models import Count, Sum
from django.db.models.functions import Cast
from django.db.models import FloatField
from django.db.models.functions import TruncDay, TruncMonth, TruncYear, TruncWeek    
from django.db.models import Q


# .filter(Q(datetime__range=[date_from, date_to]))

class Manager(models.Manager):
    
    def count_per_day(self):
        return (
            Expenses.objects
                .annotate(day=TruncDay('created_at')).values('day')
                .annotate(count=Count('created_at'))
                .annotate(total = Sum(Cast('amount', FloatField())) )
                .values('day', 'count', 'total').order_by()
        )

    def count_per_week(self):
            return (
            Expenses.objects
                .annotate(week=TruncWeek('created_at')).values('week')
                .annotate(count=Count('created_at'))
                .annotate(total = Sum(Cast('amount', FloatField())) )
                .values('week', 'count', 'total').order_by()
        )

    def count_per_month(self):
            return (
            Expenses.objects
                .annotate(month=TruncMonth('created_at')).values('month')
                .annotate(count=Count('created_at'))
                .annotate(total = Sum(Cast('amount', FloatField())) )
                .values('month', 'count', 'total').order_by()
        )

    def count_per_year(self):
            return (
            Expenses.objects
                .annotate(year=TruncYear('created_at')).values('year')
                .annotate(count=Count('created_at'))
                .annotate(total = Sum(Cast('amount', FloatField())) )
                .values('year', 'count', 'total').order_by()
        )

    def count_by_title(self):
            return (
            Expenses.objects
                .values('title').annotate(count=Count('title'))
                .annotate(total = Sum(Cast('amount', FloatField())) )
                .values('count', 'total', 'title').order_by()
        )

    def count_by_title_daily(self):
            return (
            Expenses.objects
                .annotate(day=TruncDay('created_at')).values('day')
                .annotate(count=Count('title'))
                .annotate(total = Sum(Cast('amount', FloatField())) )
                .values('day', 'count', 'total', 'title').order_by()
        )

    def count_by_title_weekly(self):
                return (
            Expenses.objects
                .annotate(week=TruncWeek('created_at')).values('week')
                .annotate(count=Count('title'))
                .annotate(total = Sum(Cast('amount', FloatField())) )
                .values('week', 'count', 'total', 'title').order_by()
        )
    
    def count_by_title_monthly(self):
            return (
            Expenses.objects
                .annotate(month=TruncMonth('created_at')).values('month')
                .annotate(count=Count('title'))
                .annotate(total = Sum(Cast('amount', FloatField())) )
                .values('month', 'count', 'total', 'title').order_by()
        )

    def count_by_title_yearly(self):
            return (
            Expenses.objects
                .annotate(year=TruncYear('created_at')).values('year')
                .annotate(count=Count('title'))
                .annotate(total = Sum(Cast('amount', FloatField())) )
                .values('year', 'count', 'total', 'title').order_by()
        )

    def total_amounts(self):
            return (
            Expenses.objects
                .filter(is_active=True)
                .aggregate(Sum('amount'))['amount__sum']
        )


class Expenses(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('Users', on_delete=models.CASCADE)
    title = models.CharField(max_length=250, blank=True, null=True, default=None)
    amount = models.DecimalField(decimal_places=2, max_digits=20, blank=True, null=True)
    created_at = models.DateField(auto_now_add=False, blank=True, null=True, default=None)
    updated_at = models.DateField(auto_now_add=False, blank=True, null=True, default=None)
    deleted_at = models.DateField(auto_now_add=False, blank=True, null=True, default=None)
    is_active = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = Manager()

    def __str__(self):
        return self.title
    
    class Meta:
        db_table = 'expenses'
        app_label = 'application'
        ordering = ('timestamp',)