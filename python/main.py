import schedule
import csv
import time
import os
from datetime import datetime
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from coin import Coin


# pridobi html kodo iz spletne strani
def get_html(url, waitForClass = None):
    service = Service('./driver/chromedriver.exe')
    browser = webdriver.Chrome(service=service)
    browser.get(url)
    time.sleep(7)
    browser.find_element_by_id('cookiescript_accept').click()
    time.sleep(7)

    html = browser.page_source
    browser.close()
    browser.quit()
    return html


def convert_billions_and_millions(str):
    if 'B' in str:
        str = str.replace('B', '')
        string_int = float(str)
        str = f'{string_int * 1000000000.0}'
        str = str.replace('.', ',')
    elif 'M' in str:
        str = str.replace('M', '')
        string_int = float(str)
        str = f'{string_int * 1000000.0}'
        str = str.replace('.', ',')
    elif 'K' in str:
        str = str.replace('K', '')
        string_int = float(str)
        str = f'{string_int * 1000.0}'
        str = str.replace('.', ',')
    return str

# pridobi polje, ki vsebuje podatke o kovancih
def get_coin_data():
    html = get_html('https://kriptomat.io/sl/vrednost-kriptovalut/')
    soup = BeautifulSoup(html, 'lxml')
    coins = []
    for coinData in soup.find_all('div', {'class': 'single_coin'}):
        name = coinData.find('div', {'class': 'coin-name'})
        if name:
            name = name.text
        else:
            name = "NaN"
        # Replace zaradi tega ker slovenski excel potrebuje ',' pri decimalkah
        price_container = coinData.find('div', {'class': 'col-price'})
        price = price_container.find('span', {'class': 'pr'})
        if price:
            price = price.text.replace(',', '').replace('.', ',')
        else:
            price = -1

        market_cap_container = coinData.find('div', {'class': 'col-marcap'})
        market_cap = market_cap_container.find('span', {'class': 'pr'})
        if market_cap:
            market_cap = market_cap.text.replace(',', '').replace('-', '0')
            # Preveri ce market_cap vsebuje B ali M --> dodaj primerno stevilo 0
            market_cap = convert_billions_and_millions(market_cap)
        else:
            market_cap = -1

        obseg_container = coinData.find('div', {'class': 'col-col24'})
        obseg = obseg_container.find('span', {'class': 'pr'})
        if obseg:
            obseg = obseg.text.replace(',', '').replace('-', '0')
            # Preveri ce obseg vsebuje B ali M --> dodaj primerno stevilo 0
            obseg = convert_billions_and_millions(obseg)
        else:
            obseg = -1
        coins.append(Coin(name, price, market_cap, obseg))
    return coins


def get_csv_data(csv_file):
    csv_data = []
    with open(csv_file, 'r') as file:
        reader = csv.reader(file, delimiter=';')
        for row in reader:
            csv_data.append(row)
    return csv_data


def create_folder(folder_path):
    if not os.path.exists(folder_path):
        os.mkdir(folder_path)
        return True
    return False


def create_coin_csv(file_name, file_folder, column_names, coins, attributes):
    file_exists = not create_folder(file_folder)
    file_location = f'{file_folder}/{file_name}'
    date_string = datetime.now().strftime("%d.%m.%Y %H:%M:%S")
    date_array = [""]
    for i in range(len(column_names) - 1):  # -1 --> skip name
        date_array.append(date_string)


    if not file_exists:
        with open(file_location, "w", newline='') as file:
            writer = csv.writer(file, delimiter=';')
            writer.writerow(date_array) # prva linija predstavlja datum in cas zapisa
            writer.writerow(column_names)
            for coin in coins:
                data = []
                for attr in attributes:
                    data.append(coin.__getattribute__(attr))
                writer.writerow(data)
    else:
        old_data = get_csv_data(file_location)
        with open(file_location, "w", newline='') as file:
            writer = csv.writer(file, delimiter=";")
            for i in range(1, len(column_names)):  # skip name column name
                old_data[0].insert(i, date_string)
                old_data[1].insert(i, column_names[i])
            for coin in coins:
                for i in range(2, len(old_data)):
                    if old_data[i][0] == coin.name:
                        for j in range(1, len(attributes)):  # skip name value
                            old_data[i].insert(j, coin.__getattribute__(attributes[j]))
            for data in old_data:
                writer.writerow(data)

def write_trading_volumes():
    coins = get_coin_data()

    price_folder_path = f'./files/price'
    market_cap_folder_path = f'./files/market-cap'
    volume_in_24_folder_path = f'./files/24h'

    price_f = 'price-data.csv'
    market_cap_f = 'market-cap-data.csv'
    volume_24_f = 'volume.csv'

    create_coin_csv(price_f, price_folder_path, ["Ime", "Cena"], coins, [Coin.name_attr, Coin.price_attr])
    create_coin_csv(market_cap_f, market_cap_folder_path, ['Ime', "Trzna kapaciteta"], coins, [Coin.name_attr, Coin.market_cap_attr])
    create_coin_csv(volume_24_f, volume_in_24_folder_path, ['Ime', "Obseg v 24ur"], coins, [Coin.name_attr, Coin.volume_24_attr])


schedule.every(5).minutes.do(write_trading_volumes)


print("Waiting for execution")
while 1:
    schedule.run_pending()
    time.sleep(1)


