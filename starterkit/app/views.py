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
    
def format_total_debt(total_debt):
    if total_debt is None:
        return None

    # Veriyi mutlak değere çevir
    abs_value = abs(total_debt)

    # Milyar birimine çevir
    billion_value = abs_value / 10**9

    # Negatif mi pozitif mi olduğuna bakarak uygun biçimde formatla
    if total_debt < 0:
        return "- {:.2f}B".format(billion_value)
    else:
        return "{:.2f}B".format(billion_value)
    
def cryptomarketcap(request):
    # Hisse senedi sembolleri
    symbols = ["ARCLK.IS", "ALARK.IS", "ASELS.IS", "ASTOR.IS", "BIMAS.IS", "BRSAN.IS", "EKGYO.IS", "ENKAI.IS", "EREGL.IS", "FROTO.IS","GUBRF.IS", "HEKTS.IS", "KCHOL.IS",
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

        #totaaldebt
        total_debt = ticker.info.get("totalDebt")

        # Her hisse senedi için verileri sözlüğe ekleyin
        stock_data[symbol] = {
            "current_price": current_price,
            "market_cap": market_cap,
            "high_52w": high_52w,
            "low_52w": low_52w,
            "pe_ratio": pe_ratio,
            "ev_ebitda": ev_ebitda,
            "free_cash_flow": free_cash_flow,
            "total_debt": total_debt
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
            "total_debt": format_total_debt(data["total_debt"]),
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

def profile(request, symbol):
    # Hisse senedi sembollerini ve etiketlerini tanımlayın
    stocks = {
        "ARCLK.IS": "ARCLK", "ALARK.IS": "ALARK", "ASELS.IS": "ASELS", "ASTOR.IS": "ASTOR", "BIMAS.IS": "BIMAS", "BRSAN.IS": "BRSAN","EKGYO.IS": "EKGYO",
        "ENKAI.IS": "ENKAI","EREGL.IS": "EREGL", "FROTO.IS": "FROTO","GUBRF.IS": "GUBRF","HEKTS.IS": "HEKTS","KCHOL.IS": "KCHOL","KONTR.IS": "KONTR", 
        "KOZAL.IS": "KOZAL","KRDMD.IS": "KRDMD","ODAS.IS": "ODAS","OYAKC.IS": "OYAKC","PETKM.IS": "PETKM",
        "PGSUS.IS": "PGSUS","SAHOL.IS": "SAHOL","SASA.IS": "SASA","SISE.IS": "SISE", 
        "TCELL.IS": "TCELL","THYAO.IS": "THYAO","TOASO.IS": "TOASO","TUPRS.IS": "TUPRS",
        # Diğer hisse senetlerini buraya ekleyin
    }

    # Tüm hisse senedi verilerini saklayacak bir sözlük oluşturun
    stock_data = {}

    # İstenen hisse senedi için verileri alın
    label = stocks.get(symbol)

    if label:
        # Ticker objesini oluşturun
        ticker = yf.Ticker(symbol)

        # Geçerli P/E oranını alın
        pe_ratio = ticker.info.get("forwardPE", "N/A")

        # Geçerli Price to Book oranını alın
        price_to_book = ticker.info.get("priceToBook", "N/A")

        #fcff
        free_cash_flow = ticker.info.get("freeCashflow", "N/A")

        # EV ve EBITDA değerleri
        enterprise_value = ticker.info.get("enterpriseValue")
        ebitda = ticker.info.get("ebitda")

        # EV/EBITDA oranı
        ev_ebitda = None
        if enterprise_value is not None and ebitda is not None and ebitda != 0:
            ev_ebitda = enterprise_value / ebitda

        # Geçerli EV/EBITDA oranını alın
        ev_ebitda = ticker.info.get("enterpriseToEbitda", "N/A")

        ev_fcff = None
        if enterprise_value == "N/A" or free_cash_flow == "N/A":
            enterprise_value = None
            free_cash_flow = None

        # Dönüştürülmüş enterprise_value ve free_cash_flow değerleri None değilse ve bir dize (str) değilse, kayan noktalı sayı (float) türüne dönüştür
        if enterprise_value is not None and not isinstance(enterprise_value, float):
            enterprise_value = float(enterprise_value)

        if free_cash_flow is not None and not isinstance(free_cash_flow, float):
            free_cash_flow = float(free_cash_flow)

        # Eğer hem enterprise_value hem de free_cash_flow değerleri None değilse ve free_cash_flow 0'a eşit değilse, ev_fcff hesapla
        if enterprise_value is not None and free_cash_flow is not None and free_cash_flow != 0:
            ev_fcff = enterprise_value / free_cash_flow
        else:
            ev_fcff = None  
        # Geçerli EV/FCFF oranını alın

        # Geçerli ROA oranını alın
        roa  = ticker.info.get("returnOnAssets", "N/A")

        # Geçerli ROE oranını alın
        roe = ticker.info.get("returnOnEquity", "N/A")

        # Geçerli Current Ratio'yu alın
        current_ratio = ticker.info.get("currentRatio", "N/A")

        # Geçerli Quick Ratio'yu alın
        quick_ratio = ticker.info.get("quickRatio", "N/A")

        #totaldebt/cash
        total_revenue = ticker.info.get("totalRevenue", "N/A")
        total_debt = ticker.info.get("totalDebt", "N/A")
        
        if total_revenue is not None and total_debt is not None:
            total_debt_to_total_assets1 = total_debt / total_revenue
            total_debt_to_total_assets = total_debt_to_total_assets1 * -1

        #fcf or totalcash / marketcap
        marketcap = ticker.info.get("marketCap", "N/A")

        if free_cash_flow is not None and marketcap is not None:
            cash_to_marketcap = free_cash_flow / marketcap
        
        # Şirket hakkında daha detaylı bilgileri alın
        company_info = ticker.info

        # Şirketin adres bilgisini alın
        address = company_info.get("address2")
        city = company_info.get("city")
        country = company_info.get("country")

        # Şirketin iletişim bilgilerini alın
        phone = company_info.get("phone")
        website = company_info.get("website")

        # Şirketin uzun açıklamasını alın
        long_description = company_info.get("longBusinessSummary")

        # Şirketin yöneticilerinin bilgilerini alın
        company_officers = ticker.info.get("companyOfficers", [])
        ceo = "N/A"
        cfo = "N/A"

        # CEO ve CFO'yu kontrol etmek için döngü
        for officer in company_officers:
            title = officer.get("title", "").lower()  # Unvanı küçük harfe dönüştür
            if "ceo" in title or "chief executive" in title or "gm" in title or "general manager" in title:
                ceo = officer.get("name", "N/A")
            elif "cfo" in title or "chief financial manager" in title or "head of financial" in title:
                cfo = officer.get("name", "N/A")

        # Hisse senedi için verileri sözlüğe ekleyin
        stock_data = {
            "pe_ratio": pe_ratio,
            "price_to_book": price_to_book,
            "ev_ebitda": ev_ebitda,
            "ev_fcff": ev_fcff,
            "roa": roa,
            "roe": roe,
            "current_ratio": current_ratio,
            "quick_ratio": quick_ratio,
            "total_debt_to_total_assets": total_debt_to_total_assets,
            "cash_market_cap": cash_to_marketcap,

            "address": address,
            "city": city,
            "country": country,
            "phone": phone,
            "website": website,
            "long_description": long_description,
            "ceo": ceo,
            "cfo": cfo
        }

        # Verileri düzeltme
        if isinstance(roa, float):
            stock_data['roa'] = '{:.4f}'.format(roa * 100) # Yüzde cinsinden göstermek için 100 ile çarpıyoruz ve 4 ondalık basamak gösteriyoruz
        if isinstance(roe, float):
            stock_data['roe'] = '{:.2f}'.format(roe * 100) # Yüzde cinsinden göstermek için 100 ile çarpıyoruz ve 2 ondalık basamak gösteriyoruz
        if isinstance(cash_to_marketcap, float):
            stock_data['cash_market_cap'] = '{:.4f}'.format(cash_to_marketcap) # Sayıyı iki ondalık basamağa yuvarlıyoruz
            if cash_to_marketcap < 0:
                stock_data['cash_market_cap'] = stock_data['cash_market_cap'].lstrip('-') # Eğer değer negatifse başındaki "-" işaretini kaldırıyoruz

        # Verileri şablona gönderin
        return render(request, 'profile.html', {'symbol': symbol, 'stock_data': stock_data})
    else:
        # Geçersiz sembol durumunda hata sayfasına yönlendirme
        return render(request, 'error.html', {'error_message': 'Geçersiz sembol: {}'.format(symbol)})
def tables (request): 
    return render(request, 'tables.html')

def tables2 (request): 
    return render(request, 'tables2.html')

def apexcolumncharts (request): 
    return render(request, 'apexcolumncharts.html') 

def apexlinecharts (request):     
    return render(request, 'apexlinecharts.html')

