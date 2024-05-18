from django.shortcuts import render
import yfinance as yf
import pandas as pd
import plotly.graph_objects as go
from plotly.io import to_html
from datetime import datetime
from .models import Company

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
   
    abs_value = abs(free_cash_flow)

    billion_value = abs_value / 10**9

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


def marketcap(request):
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
            pe_ratio = float(pe_ratio)
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
    # Eski kodlar burada
    
    # Sıralama parametresini al

    return render(request, 'marketcap.html', {'stock_data': formatted_stock_data})

def retrieve_stock_data(ticker: str, start_date: str = "2020-01-01", end_date: str = datetime.now().strftime("%Y-%m-%d")):
    ticker_info = ticker.info
    
    start_date = datetime.strptime(start_date, "%Y-%m-%d")
    end_date = datetime.strptime(end_date, "%Y-%m-%d")
    
    hist_df = ticker.history(start=start_date, end=end_date)
    hist_df = hist_df.reset_index()

    return hist_df, ticker_info

def convert_stock_prices_to_usd(ticker: str, start_date: str = "2020-01-01", end_date: str = datetime.now().strftime("%Y-%m-%d")):
    # Hisse senedi verilerini TL cinsinden alın
    hist_df = yf.download(ticker, start=start_date, end=end_date)

    # USD/TRY döviz kuru verilerini alın
    usd_try_data = yf.download("USDTRY=X", start=start_date, end=end_date)['Close']

    # TL cinsinden hisse senedi fiyatlarını alın
    tl_prices = hist_df['Close']

    # TL fiyatlarını USD cinsine dönüştürme
    tl_to_usd_prices = tl_prices / usd_try_data

    return tl_to_usd_prices

def create_line_chart_with_usd_prices(symbol: str, start_date: str = "2020-01-01", end_date: str = datetime.now().strftime("%Y-%m-%d")):
    # Hisse senedi verilerini TL cinsinden alın
    hist_df = yf.download(symbol, start=start_date, end=end_date)

    # USD cinsinden hisse senedi fiyatlarını alın
    usd_stock_prices = convert_stock_prices_to_usd(symbol, start_date, end_date)

    # Plotly grafiği oluşturma
    fig = go.Figure()

    fig.add_trace(go.Scatter(x=hist_df.index, y=usd_stock_prices, mode='lines', name='Close (USD)',
                             hovertemplate='<b>Date</b>: %{x|%d-%m-%Y}<br><b>Price (USD)</b>: $%{y:.2f}<extra></extra>',
                             fill='tozeroy', 
                             fillcolor='rgba(147, 112, 219, 0.2)',
                             line=dict(color='#9370DB')))

    # Grafiği düzenleme
    fig.update_layout(
        xaxis_title="Date",
        yaxis_title="Price",
        template="plotly_white",
        plot_bgcolor="white",
        margin={"t": 60, "l": 0, "r": 0, "b": 0},
        height=500,  
        width=1570, 
    )

    fig.update_xaxes(
        showgrid=True,  # Dikey çizgileri göster
        gridcolor="rgba(0, 0, 0, 0.1)",  # Çizgi rengi (hafif gri)
        linecolor="gray",    # X eksen çizgisi rengi (siyah)
        linewidth=2,  # X eksen çizgisi kalınlığı
    )

    fig.update_yaxes(
        showgrid=True,  # Yatay çizgileri göster
        gridcolor="rgba(0, 0, 0, 0.1)",  # Çizgi rengi (hafif gri)
        linecolor="gray",    # X eksen çizgisi rengi (siyah)
        linewidth=2,  # X eksen çizgisi kalınlığı
    )

    return fig

def create_line_chart(hist_df: pd.DataFrame):
    fig = go.Figure(data=[
        go.Scatter(
            x=hist_df['Date'],
            y=hist_df['Close'],
            mode='lines',
            fill='tozeroy',  # Alanı x eksenine kadar boyayacak
            fillcolor='rgba(147, 112, 219, 0.2)',  # Hafif mor renk
            line=dict(color='#9370DB'),
            name='Close Price',
            hovertemplate='<b>Date</b>: %{x| %d-%m-%Y}<br><b>Price (TL)</b>: ₺%{y:.2f}<extra></extra>'
        )
    ])
    
    fig.update_layout(
        xaxis_title="Date",
        yaxis_title="Price",
        height=500,  
        width=1570, 
        plot_bgcolor="white",
        margin={"t":0, "l":0, "r":0, "b":0}
    )
   
    fig.update_xaxes(
        showgrid=True,  # Dikey çizgileri göster
        gridcolor="rgba(0, 0, 0, 0.1)",  # Çizgi rengi (hafif gri)
        linecolor="gray",    # X eksen çizgisi rengi (siyah)
        linewidth=2,  # X eksen çizgisi kalınlığı
    )

    fig.update_yaxes(
        showgrid=True,  # Yatay çizgileri göster
        gridcolor="rgba(0, 0, 0, 0.1)",  # Çizgi rengi (hafif gri)
        linecolor="gray",    # X eksen çizgisi rengi (siyah)
        linewidth=2,  # X eksen çizgisi kalınlığı
    )

    return fig

def get_cash_flow_data(symbol):
    try:
        company_obj = Company.objects.get(symbol=symbol)
        cash_flow_data = company_obj.cash_flow
        return cash_flow_data
    
    except Company.DoesNotExist:
        return None
    
def get_income_statement_data(symbol):
    try:
        company_obj = Company.objects.get(symbol=symbol)
        income_statement_data = company_obj.income_statement
        return income_statement_data
    
    except Company.DoesNotExist:
        return None
    
def get_balance_sheet_data(symbol):
    try:
        company_obj = Company.objects.get(symbol=symbol)
        balance_sheet_data = company_obj.balance_sheet
        return balance_sheet_data
    
    except Company.DoesNotExist:
        return None
    
def get_profitability_data(symbol):
    try:
        company_obj = Company.objects.get(symbol=symbol)
        profitability_data = company_obj.profitability
        return profitability_data
    
    except Company.DoesNotExist:
        return None
    

def get_stock_name(symbol):
    company_obj = Company.objects.get(symbol=symbol)
    stock_name = company_obj.name
    return stock_name
    
def generate_net_debt_change_chart(symbol):
    # Sembole göre finansal verileri çek
    ticker = yf.Ticker(symbol)
    
    try:
        # Bilanço tablosunu al
        balance_sheet_annual = ticker.balance_sheet
        # DataFrame oluştur
        df_balance_sheet = pd.DataFrame(balance_sheet_annual)
        
        # Gerekli verileri seç
        required_values = ['Total Debt', 'Cash And Cash Equivalents', 'Other Short Term Investments']
        
        # Anahtarların veri setinde olup olmadığını kontrol et
        if 'Other Short Term Investments' not in df_balance_sheet.index:
            required_values.remove('Other Short Term Investments')
        
        # Seçilen verileri bir önceki yılın verileriyle birleştir
        selected_data = df_balance_sheet.loc[required_values].T
        
        # Tarih aralığını oluştur
        dates = pd.date_range('2020-12-31', '2023-12-31', freq='Y')
        
        # Seçilen verileri belirtilen tarih aralığına göre filtrele
        selected_data = selected_data[selected_data.index.isin(dates)]
        
        # Farkları içeren bir DataFrame oluştur
        percentage_change_df = pd.DataFrame(columns=['2021', '2022', '2023'])
        
        if '2020-12-31' in selected_data.index and '2021-12-31' in selected_data.index:
            percentage_change_2021_2020 = (selected_data.loc['2021-12-31'] / selected_data.loc['2020-12-31'] - 1) * 100
            percentage_change_df['2021'] = percentage_change_2021_2020
        
        if '2021-12-31' in selected_data.index and '2022-12-31' in selected_data.index:
            percentage_change_2022_2021 = (selected_data.loc['2022-12-31'] / selected_data.loc['2021-12-31'] - 1) * 100
            percentage_change_df['2022'] = percentage_change_2022_2021
        
        if '2022-12-31' in selected_data.index and '2023-12-31' in selected_data.index:
            percentage_change_2023_2022 = (selected_data.loc['2023-12-31'] / selected_data.loc['2022-12-31'] - 1) * 100
            percentage_change_df['2023'] = percentage_change_2023_2022
            
        # Finansal kalemleri ayrı sütunlar olarak ayır
        separated_df = pd.DataFrame()
            
        for index in percentage_change_df.index:
            separated_df[index] = percentage_change_df.loc[index]
            

        # Görselleştirme
        fig = go.Figure()
        colors = ["#845adf", "#f5b849", "#23b7e5"]
            
        for i, column in enumerate(separated_df.columns):
            fig.add_trace(go.Bar(x=[f"202{i+1}" for i in range(len(separated_df))], y=separated_df[column], name=column,
                                 marker_color=colors[i],
                                 text=[f"{val:.1f}%" for val in separated_df[column]],
                                 hoverinfo='text',
                                 textposition='auto',
                                 showlegend=True))
            
        fig.update_layout(title='',
                          xaxis=dict(title=''),
                          yaxis=dict(title=''),
                          plot_bgcolor='rgba(0,0,0,0)',
                          barmode='group',
                          height=500,  
                          width=1570,)  # Yükseklik ayarı
            
        # "Total Debt" yerine "Financial Debt" olarak gösterim düzenleme
        fig.for_each_trace(lambda trace: trace.update(name=trace.name.replace('Total Debt', 'Financial Debt')))
            
        fig.update_xaxes(showline=True, linewidth=1, linecolor='black')
        fig.update_yaxes(showline=True, linewidth=1, linecolor='black')
        
    except KeyError:
        print("Veri setinde beklenmeyen bir anahtar bulundu.")
        return None

    return fig



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

        pe_ratio = ticker.info.get("trailingPE", "N/A")
        price_to_book = ticker.info.get("priceToBook", "N/A")

        enterprise_value = ticker.info.get("enterpriseValue", "N/A")
        ebitda = ticker.info.get("ebitda", "N/A")
        enterpriseToEbitda = ticker.info.get("enterpriseToEbitda", "N/A")

        ev_fcff = None
        free_cash_flow = ticker.info.get("freeCashflow", "N/A")
        if enterprise_value != "N/A" and free_cash_flow != "N/A":
            ev_fcff = round(enterprise_value / free_cash_flow, 2)
        else:
            ev_fcff = "N/A"
            
        roa = ticker.info.get("returnOnAssets", "N/A")
        roe = ticker.info.get("returnOnEquity", "N/A")
        current_ratio = ticker.info.get("currentRatio", "N/A")
        quick_ratio = ticker.info.get("quickRatio", "N/A")

        total_debt = ticker.info.get("totalDebt", "N/A")
        total_debt_to_fcf = None
    
        # total_debt ve free_cash_flow değerlerini float (ondalıklı sayı) türüne dönüştürme
        try:
            total_debt = float(total_debt)
            free_cash_flow = float(free_cash_flow)
        except (TypeError, ValueError):
        # Dönüşüm hatası oluşursa veya değerler None ise, uygun bir hata mesajı veya varsayılan değer döndürme
            total_debt = None
            free_cash_flow = None

        # total_debt ve free_cash_flow değerleri uygun formata dönüştürüldüyse işlemi yapma
        if total_debt is not None and free_cash_flow is not None:
            total_debt_to_fcf = round(total_debt / free_cash_flow, 2)
        else:
            total_debt_to_fcf = "N/A"  # veya uygun bir hata mesajı veya varsayılan değer

        marketcap = ticker.info.get("marketCap", "N/A")
        total_cash = ticker.info.get("totalCash", "N/A")
        cash_to_marketcap = None
        if total_cash and marketcap:
            cash_to_marketcap = round(total_cash / marketcap, 2)
        
        # Şirket hakkında daha detaylı bilgileri alın
        company_info = ticker.info

        # Şirketin adres bilgisini alın
        address = company_info.get("address2")
        city = company_info.get("city")
        country = company_info.get("country")
        sector = company_info.get("sector")
        industry = company_info.get("industry")

        # Şirketin iletişim bilgilerini alın
        phone = company_info.get("phone")
        website = company_info.get("website")
        long_name = company_info.get("longName")

        # Şirketin uzun açıklamasını alın
        long_description = company_info.get("longBusinessSummary")

        # Şirketin yöneticilerinin bilgilerini alın
        company_officers = ticker.info.get("companyOfficers", [])
        ceo = "N/A"
        cfo = "N/A"

        hist_df = yf.download(symbol, start="2020-01-01", end=datetime.now().strftime("%Y-%m-%d"))
        usd_chart = create_line_chart_with_usd_prices(symbol)
        
        # USDTRY kuru için grafik oluşturun
        hist_df_tl, info = retrieve_stock_data(ticker)
        linechart_fig = create_line_chart(hist_df_tl)

        
        chart_div = to_html(linechart_fig, full_html=False, include_plotlyjs="cdn")
        usd_chart_div = to_html(usd_chart, full_html=False, include_plotlyjs="cdn")

        p1, p2 = hist_df["Close"].values[-1], hist_df["Close"].values[-2]
        change, prcnt_change = (p2-p1), (p2-p1) / p1
        # USD/TRY döviz kurunu alın (TL cinsinden)
        columnchart_fig = generate_net_debt_change_chart(symbol)
        chart_netdebt_div = to_html(columnchart_fig, full_html=False, include_plotlyjs="cdn")


        cash_flow= get_cash_flow_data(symbol)
        income_data = get_income_statement_data(symbol)
        balance_data = get_balance_sheet_data(symbol)
        profitability_data = get_profitability_data(symbol)
        stock_name = get_stock_name(symbol)


        # CEO ve CFO'yu kontrol etmek için döngü
        for officer in company_officers:
            title = officer.get("title", "").lower()  # Unvanı küçük harfe dönüştür
            if "ceo" in title or "chief executive" in title or "gm" in title or "general manager" in title:
                ceo = officer.get("name", "N/A")
            elif "cfo" in title or "chief financial" in title or "head of financial" in title or "director of finance" in title or "financial director":
                cfo = officer.get("name", "N/A")

        # Hisse senedi için verileri sözlüğe ekleyin
        stock_data = {
            "pe_ratio": round(float(pe_ratio), 2) if pe_ratio != "N/A" else pe_ratio,
            "price_to_book": round(price_to_book, 2) if price_to_book != "N/A" else price_to_book,
            "ev_ebitda": round(enterpriseToEbitda, 2) if enterpriseToEbitda != "N/A" else enterpriseToEbitda,
            "ebitda": round(ebitda, 2) if ebitda != "N/A" else ebitda,
            "ev_fcff": ev_fcff,
            "roa": round(roa * 100, 2) if isinstance(roa, float) else roa,
            "roe": round(roe * 100, 2) if isinstance(roe, float) else roe,
            "current_ratio": round(current_ratio, 2) if current_ratio != "N/A" else current_ratio,
            "quick_ratio": round(quick_ratio, 2) if quick_ratio != "N/A" else quick_ratio,
            "total_debt_to_fcf": total_debt_to_fcf,
            "cash_market_cap": cash_to_marketcap,

            
            "address": address,
            "city": city,
            "country": country,
            "phone": phone,
            "website": website,
            "long_name": long_name,
            "long_description": long_description,
            "sector": sector,
            "industry": industry,
            "ceo": ceo,
            "cfo": cfo,
            "chart_div": chart_div,
            "usd_chart_div": usd_chart_div,
            "chart_netdebt_div": chart_netdebt_div,
            "cash_flow": cash_flow,
            "income_data": income_data,
            "balance_data": balance_data,
            "profitability_data": profitability_data,
            "stock_name": stock_name,
        }

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

