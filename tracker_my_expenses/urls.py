from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from application.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('application.urls'), name='application'),
    url(r'^api/day_count', CountPerDayView.as_view(), name='count-per-day-view'),
    url(r'^api/week_count', CountPerWeekView.as_view(), name='count-per-week-view'),
    url(r'^api/month_count', CountPerWeekView.as_view(), name='count-per-month-view'),
    url(r'^api/year_count', CountPerYearView.as_view(), name='count-per-year-view'),
    url(r'^api/title_count', CountByTitleView.as_view(), name='count-by-title-view'),
    url(r'^api/title_monthly_count', CountByTitleMonthlyView.as_view(), name='count-by-title-monthly-view'),
    url(r'^api/title_yearly_count', CountByTitleYearlyView.as_view(), name='count-by-title-yearly-view'),
    url(r'^api/expenses_repport', DataRepports.as_view(), name='data-repports'),
]
