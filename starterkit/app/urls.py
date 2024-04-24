from . import views
from django.urls import path

appname = 'app'

urlpatterns = [
    path('', views.cryptomarketcap, name='cryptomarketcap'),
    path('datatables/', views.datatables, name='datatables'),
    path('gridtables/', views.gridtables, name='gridtables'),
    path('cryptomarketcap/', views.cryptomarketcap, name='cryptomarketcap'),
    path('profile/<str:symbol>/', views.profile, name='profile'),    
    path('apexmixedcharts/', views.apexmixedcharts, name='apexmixedcharts'),
    path('tables2/', views.tables2, name='tables2'),
    path('apexcolumncharts/', views.apexcolumncharts, name='apexcolumncharts'),
    path('apexlinecharts/', views.apexlinecharts, name='apexlinecharts'),
]