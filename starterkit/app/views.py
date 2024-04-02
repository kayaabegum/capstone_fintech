from django.shortcuts import render
from db_connection import get_db
from .models import hissekar

# Create your views here.
def index (request): 
    return render(request, 'index.html')

def datatables (request): 
    return render(request, 'datatables.html')

def gridtables (request): 
    return render(request, 'gridtables.html')

def apexmixedcharts (request): 
    return render(request, 'apexmixedcharts.html')

def cryptomarketcap (request): 
    return render(request, 'cryptomarketcap.html')


def profile(request):
    db = get_db()
    collection = db['hissekar']
    pipeline = []
    if request.GET.get('year'):
        year = request.GET['year']
        pipeline.append({'$match': {'year': year}})
    hissekar = collection.aggregate(pipeline)
    
    return render(request, 'profile.html', {'hissekar': hissekar})


def tables (request): 
    return render(request, 'tables.html')

def tables2 (request): 
    return render(request, 'tables2.html')

def apexcolumncharts (request): 
    return render(request, 'apexcolumncharts.html') 

def apexlinecharts (request):     
    return render(request, 'apexlinecharts.html')

