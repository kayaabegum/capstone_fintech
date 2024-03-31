from django.db import models

def get_db():
    return pymongo_client['hissekar']

class hissekar(models.Model):
    company = models.CharField(max_length=100)
    year = models.CharField(max_length=4)
    revenue = models.FloatField()
    gross_profit = models.FloatField()
    operating_income = models.FloatField()
    nopat = models.FloatField()
    ebit = models.FloatField()
    ebitda = models.FloatField()
    net_income = models.FloatField()
    fcff = models.FloatField()
