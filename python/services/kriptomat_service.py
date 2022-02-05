from datetime import datetime
from models.coin import Coin
from models.html_reader import HTMLReader
import csv


class KriptomatService:
    __base_url = 'https://kriptomat.io/sl/vrednost-kriptovalut/'

    def __get_html(self):
        baseReader = HTMLReader(page_url=self.__base_url, cookie_button_id='cookiescript_accept')
        self.readers = [baseReader]
        for pageBtn in baseReader.get_element_list_by_tag(tag_name='a', attributes={'class': 'page-numbers'}):
            self.readers.append(HTMLReader(page_url=pageBtn['href'], cookie_button_id='cookiescript_accept'))

    def __get_csv_data(self, csv_file):
        csv_data = []
        with open(csv_file, 'r') as file:
            reader = csv.reader(file, delimiter=';')
            for row in reader:
                csv_data.append(row)
        return csv_data

    def __format_price(self, price_str):
        try:
            price_str = price_str.replace(',', '')
            if 'B' in price_str:
                return float(price_str.replace('B', '')) * 1000000000.0
            elif 'M' in price_str:
                return float(price_str.replace('M', '')) * 1000000.0
            elif 'K' in price_str:
                return float(price_str.replace('K', '')) * 1000.0
            return float(price_str)
        except:
            return None

    def __get_coin(self, single_coin_html):
        price_container = single_coin_html.find('div', 'col-price')
        url_conn_container = single_coin_html.find('div', 'col-pricebtn')

        name = single_coin_html.find('div', {'class': 'coin-name'})
        svg_link = single_coin_html.find('img', {'class': 'coin-icon'})
        price = price_container.find('span', {'class', 'pr'})
        url_conn = url_conn_container.find('a')

        if name and price and url_conn and svg_link:
            price_val = self.__format_price(price.text)

            if price_val >= 0:
                return Coin(
                    name=name.text,
                    price=price_val,
                    connection=url_conn['href'],
                    svg_link=f'https://kriptomat.io{svg_link["src"]}',
                    date=datetime.now()
                )
        return None

    def get_coins(self):
        self.__get_html()
        coins = []
        for reader in self.readers:
            coin_html_list = reader.get_element_list_by_tag('div', {'class': 'single_coin'})
            for coin_html in coin_html_list:
                coin = self.__get_coin(coin_html)
                if coin:
                    coins.append(coin)
        return coins

    def get_coins_from_csv(self, csv_file):
        csv_data = self.__get_csv_data(csv_file=csv_file)
        dates = []
        coins = []
        for i in range(len(csv_data[0])):
            if i > 0:
                timestamp = datetime.strptime(csv_data[0][i], "%d.%m.%Y %H:%M:%S")
                dates.append(timestamp)

        for i in range(2, len(csv_data)):
            coinName = csv_data[i][0]
            for j in range(1, len(csv_data[i])):
                price_val = self.__format_price(csv_data[i][j].replace(',', '.'))
                if csv_data[i][j] != '-1' and csv_data[i][j] != 'NaN' and price_val and price_val >= 0:
                    coins.append(Coin(name=coinName, price=price_val, connection='', svg_link='', date=dates[j - 1]))
        return coins
