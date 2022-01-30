# import schedule
# import csv
# import time
# from datetime import datetime
# from bs4 import BeautifulSoup
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from models.coin import Coin
# from models.coin_file import CoinFile
# import json
#
# # pridobi html kodo iz spletne strani
#
#
# def get_html(url, waitForClass = None):
#     service = Service('./driver/chromedriver.exe')
#     options = webdriver.ChromeOptions()
#     options.add_experimental_option('excludeSwitches', ['enable-logging'])
#     browser = webdriver.Chrome(service=service, options=options)
#     browser.get(url)
#
#     time.sleep(7)
#     browser.find_element_by_id('cookiescript_accept').click()
#     time.sleep(7)
#
#     html = browser.page_source
#     browser.close()
#     browser.quit()
#     return html
#
#
# def convert_billions_and_millions(str):
#     if 'B' in str:
#         str = str.replace('B', '')
#         string_int = float(str)
#         str = f'{string_int * 1000000000.0}'
#         str = str.replace('.', ',')
#     elif 'M' in str:
#         str = str.replace('M', '')
#         string_int = float(str)
#         str = f'{string_int * 1000000.0}'
#         str = str.replace('.', ',')
#     elif 'K' in str:
#         str = str.replace('K', '')
#         string_int = float(str)
#         str = f'{string_int * 1000.0}'
#         str = str.replace('.', ',')
#     return str
#
# # pridobi polje, ki vsebuje podatke o kovancih
# def get_coin_data():
#     html = get_html('https://kriptomat.io/sl/vrednost-kriptovalut/')
#     soup = BeautifulSoup(html, 'lxml')
#     coins = []
#     for coinData in soup.find_all('div', {'class': 'single_coin'}):
#         name = coinData.find('div', {'class': 'coin-name'})
#         if name:
#             name = name.text
#         else:
#             name = "NaN"
#         # Replace zaradi tega ker slovenski excel potrebuje ',' pri decimalkah
#         price_container = coinData.find('div', {'class': 'col-price'})
#         price = price_container.find('span', {'class': 'pr'})
#         if price:
#             price = price.text.replace(',', '').replace('.', ',')
#         else:
#             price = -1
#
#         market_cap_container = coinData.find('div', {'class': 'col-marcap'})
#         market_cap = market_cap_container.find('span', {'class': 'pr'})
#         if market_cap:
#             market_cap = market_cap.text.replace(',', '').replace('-', '0')
#             # Preveri ce market_cap vsebuje B ali M --> dodaj primerno stevilo 0
#             market_cap = convert_billions_and_millions(market_cap)
#         else:
#             market_cap = -1
#
#         obseg_container = coinData.find('div', {'class': 'col-col24'})
#         obseg = obseg_container.find('span', {'class': 'pr'})
#         if obseg:
#             obseg = obseg.text.replace(',', '').replace('-', '0')
#             # Preveri ce obseg vsebuje B ali M --> dodaj primerno stevilo 0
#             obseg = convert_billions_and_millions(obseg)
#         else:
#             obseg = -1
#         coins.append(Coin(name, price, market_cap, obseg))
#     return coins
#
#
# def get_csv_data(csv_file):
#     csv_data = []
#     with open(csv_file, 'r') as file:
#         reader = csv.reader(file, delimiter=';')
#         for row in reader:
#             csv_data.append(row)
#     return csv_data
#
#
# def create_coin_csv(coin_file, column_names, coins, attributes):
#     file_exists = not coin_file.create_folder()
#     file_location = coin_file.file_location()
#     date_string = datetime.now().strftime("%d.%m.%Y %H:%M:%S")
#
#     date_array = [""]
#     for i in range(len(column_names) - 1):  # -1 --> skip name
#         date_array.append(date_string)
#
#     if not file_exists:
#         with open(file_location, "w", newline='') as file:
#             writer = csv.writer(file, delimiter=';')
#             writer.writerow(date_array) # prva linija predstavlja datum in cas zapisa
#             writer.writerow(column_names)
#             for coin in coins:
#                 data = []
#                 for attr in attributes:
#                     data.append(coin.__getattribute__(attr))
#                 writer.writerow(data)
#     else:
#         old_data = get_csv_data(file_location)
#         with open(file_location, "w", newline='') as file:
#             writer = csv.writer(file, delimiter=";")
#             for i in range(1, len(column_names)):  # skip name column name
#                 old_data[0].insert(i, date_string)
#                 old_data[1].insert(i, column_names[i])
#             for coin in coins:
#                 for i in range(2, len(old_data)):
#                     if old_data[i][0] == coin.name:
#                         for j in range(1, len(attributes)):  # skip name value
#                             old_data[i].insert(j, coin.__getattribute__(attributes[j]))
#             for data in old_data:
#                 writer.writerow(data)
#
#
# def coins_from_csv(csvData):
#     data = {
#         'coins': [],
#         'dates': []
#     }
#
#     for i in range(len(csvData[0])):
#         if i > 0:  # First row containing dates
#             data['dates'].append(csvData[0][i])
#
#     for i in range(2, len(csvData)):
#         coin = Coin(csvData[i][0], [], -1, -1)
#         for j in range(1, len(csvData[i])):
#             coin.price.append(csvData[i][j])
#         data['coins'].append(coin)
#     return data
#
#
# def create_percentage_change_table(newFile, dataFile):
#     csvData = get_csv_data(dataFile)
#     coins = coins_from_csv(csvData)
#     pricePercentageChange = {
#         'dates': coins['dates'],
#         'coins': []
#     }
#     for coin in coins['coins']:
#         lastVal = float(coin.price[-1].replace(',', '.'))
#         coinVal = Coin(coin.name, [], -1, -1)
#         for price in coin.price:
#             priceVal = float(price.replace(',', '.'))
#             percentChange = (priceVal * 100 / lastVal) - 100
#             coinVal.price.append(str(percentChange).replace('.', ','))
#         pricePercentageChange['coins'].append(coinVal)
#     print(pricePercentageChange['coins'][0])
#
#     with open(newFile, "w", newline='') as file:
#         writer = csv.writer(file, delimiter=";")
#         pricePercentageChange['dates'].insert(0, '')
#         writer.writerow(pricePercentageChange['dates'])
#         for coin in pricePercentageChange['coins']:
#             coin.price.insert(0, coin.name)
#             writer.writerow(coin.price)
#
#
# def create_daily_change_table(newFile, dataFile):
#     csvData = get_csv_data(dataFile)
#     coins = coins_from_csv(csvData)
#     pricePercentageChange = {
#         'dates': coins['dates'],
#         'coins': []
#     }
#     for coin in coins['coins']:
#         lastVal = float(coin.price[-1].replace(',', '.'))
#         coinVal = Coin(coin.name, [], -1, -1)
#         for price in coin.price:
#             priceVal = float(price.replace(',', '.'))
#             daily_change = (priceVal * 100 / lastVal) - 100
#             coinVal.price.append(str(daily_change).replace('.', ','))
#         pricePercentageChange['coins'].append(coinVal)
#     print(pricePercentageChange['coins'][0])
#
#     with open(newFile, "w", newline='') as file:
#         writer = csv.writer(file, delimiter=";")
#         pricePercentageChange['dates'].insert(0, '')
#         writer.writerow(pricePercentageChange['dates'])
#         for coin in pricePercentageChange['coins']:
#             coin.price.insert(0, coin.name)
#             writer.writerow(coin.price)
#
#
# def write_trading_volumes():
#     coins = get_coin_data()
#     price = CoinFile(file='price-data.csv', folder='./files/price')
#     market_cap = CoinFile(file='market-cap-data.csv', folder='./files/market-cap')
#     volume_24 = CoinFile(file='volume.csv', folder='./files/24h')
#
#     create_coin_csv(price, ["Ime", "Cena"], coins, [Coin.name_attr, Coin.price_attr])
#     create_coin_csv(market_cap, ['Ime', "Trzna kapaciteta"], coins, [Coin.name_attr, Coin.market_cap_attr])
#     create_coin_csv(volume_24, ['Ime', "Obseg v 24ur"], coins, [Coin.name_attr, Coin.volume_24_attr])
#
#
# def coins_to_JSON(coins):
#     coinsAsJson = []
#     for coin in coins['coins']:
#         coinsAsJson.append(coin.to_json())
#     return coinsAsJson
#
#
# def create_json(filename, datafile):
#     csvData = get_csv_data(datafile)
#     coins = coins_from_csv(csvData)
#     coins['coins'] = coins_to_JSON(coins)
#     with open(filename, 'w') as file:
#         file.write(json.dumps(coins))
#
#
#

from services.database_service import DatabaseService
from services.kriptomat_service import KriptomatService


kriptomat_service = KriptomatService()
db_service = DatabaseService()


def main():
    coins = kriptomat_service.get_coins()
    db_service.insert_coins(coins)
    print(f'Number of coins: {len(coins)}')


main()

# create_percentage_change_table('sprememba_v_odstotkih.csv', 'price-data21122021.csv')
# create_json('../node-server/src/data/web-data.json', 'price-data21122021.csv')
# schedule.every(5).minutes.do(write_trading_volumes)
# print("Waiting for execution")
# while 1:
#     schedule.run_pending()
#     time.sleep(1)
#
