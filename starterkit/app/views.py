from django.shortcuts import render
import yfinance as yf

def format_market_cap(market_cap):
    if market_cap is None:
        return "-"

    market_cap = int(market_cap)
    if market_cap >= 10**12:  # Trilyon ve üzeri
        return f'₺{market_cap / 10**12:.3f}T'
    elif market_cap >= 10**9:  # Milyar ve üzeri
        return f'₺{market_cap / 10**9:.3f}B'
    elif market_cap >= 10**6:  # Milyon ve üzeri
        return f'₺{market_cap / 10**6:.3f}M'
    else:
        return f'₺{market_cap}'
    
def format_free_cash_flow(free_cash_flow):
    if free_cash_flow is None:
        return None

    # Veriyi mutlak değere çevir
    abs_value = abs(free_cash_flow)

    # Milyar birimine çevir
    billion_value = abs_value / 10**9

    # Negatif mi pozitif mi olduğuna bakarak uygun biçimde formatla
    if free_cash_flow < 0:
        return "- {:.2f}B".format(billion_value)
    else:
        return "{:.2f}B".format(billion_value)
    
def cryptomarketcap(request):
    # Hisse senedi sembolleri
    symbols = ["ALARK.IS", "ASELS.IS", "ASTOR.IS", "BIMAS.IS", "BRSAN.IS", "EKGYO.IS", "ENKAI.IS", "EREGL.IS", "FROTO.IS","GUBRF.IS", "HEKTS.IS", "KCHOL.IS",
    "KONTR.IS", "KOZAL.IS", "KRDMD.IS", "ODAS.IS", "OYAKC.IS",
    "PETKM.IS", "PGSUS.IS", "SAHOL.IS", "SASA.IS", "SISE.IS",
    "TCELL.IS", "THYAO.IS", "TOASO.IS", "TUPRS.IS"]

    # Tüm hisse senedi verilerini saklayacak bir sözlük oluşturalım
    stock_data = {}

    for symbol in symbols:
        # Ticker objesi
        ticker = yf.Ticker(symbol)

        # Geçerli fiyat
        current_price = ticker.history(period="1d")["Close"].iloc[-1]

        # 52 hafta en yüksek ve en düşük fiyatları
        high_52w = ticker.info["fiftyTwoWeekHigh"]
        low_52w = ticker.info["fiftyTwoWeekLow"]

        # Piyasa değerini alın
        market_cap = ticker.info["marketCap"]

        # PE Ratio
        pe_ratio = ticker.info.get("trailingPE")
        if pe_ratio is not None:
            pe_ratio = "{:.2f}".format(pe_ratio)

        # EV ve EBITDA değerleri
        enterprise_value = ticker.info.get("enterpriseValue")
        ebitda = ticker.info.get("ebitda")

        # EV/EBITDA oranı
        ev_ebitda = None
        if enterprise_value is not None and ebitda is not None and ebitda != 0:
            ev_ebitda = enterprise_value / ebitda

        # Free Cash Flow
        free_cash_flow = ticker.info.get("freeCashflow")

        # Her hisse senedi için verileri sözlüğe ekleyin
        stock_data[symbol] = {
            "current_price": current_price,
            "market_cap": market_cap,
            "high_52w": high_52w,
            "low_52w": low_52w,
            "pe_ratio": pe_ratio,
            "ev_ebitda": ev_ebitda,
            "free_cash_flow": free_cash_flow,
            # Diğer verileri ekleyin
        }
        formatted_stock_data = {
        symbol: {
            "current_price": data["current_price"],
            "market_cap": format_market_cap(data["market_cap"]),
            "high_52w": data["high_52w"],
            "low_52w": data["low_52w"],
            "pe_ratio": data["pe_ratio"],
            "ev_ebitda": "{:.2f}".format(data["ev_ebitda"]) if data["ev_ebitda"] is not None else None,  # İki ondalık hane için formatlama
            "free_cash_flow": format_free_cash_flow(data["free_cash_flow"]), # Formatlanmış Free Cash Flow değeri
        }
        for symbol, data in stock_data.items()
    }

    return render(request, 'cryptomarketcap.html', {'stock_data': formatted_stock_data})

def index (request): 
    return render(request, 'index.html')

def datatables (request): 
    return render(request, 'datatables.html')

def gridtables (request): 
    return render(request, 'gridtables.html')

def apexmixedcharts (request): 
    return render(request, 'apexmixedcharts.html')

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

