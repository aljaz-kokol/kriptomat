from datetime import datetime
from models.coin import Coin
from models.html_reader import HTMLReader


class KriptomatService:
    __base_url = 'https://kriptomat.io/sl/vrednost-kriptovalut/'

    def __get_html(self):
        baseReader = HTMLReader(page_url=self.__base_url, cookie_button_id='cookiescript_accept')
        self.readers = [baseReader]
        for pageBtn in baseReader.get_element_list_by_tag(tag_name='a', attributes={'class': 'page-numbers'}):
            self.readers.append(HTMLReader(page_url=pageBtn['href'], cookie_button_id='cookiescript_accept'))

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
        market_cap_container = single_coin_html.find('div', 'col-marcap')
        volume_container = single_coin_html.find('div', 'col-col24')  # Obseg v 24h container
        url_conn_container = single_coin_html.find('div', 'col-pricebtn')

        name = single_coin_html.find('div', {'class': 'coin-name'})
        price = price_container.find('span', {'class', 'pr'})
        market_cap = market_cap_container.find('span', {'class', 'pr'})
        volume24 = volume_container.find('span', {'class', 'pr'})  # Obseg v 24h
        url_conn = url_conn_container.find('a')

        if name and price and market_cap and volume24 and url_conn:
            price_val = self.__format_price(price.text)

            if price_val >= 0:
                return Coin(
                    name=name.text,
                    price=price_val,
                    market_cap=market_cap.text,
                    volume_24h=volume24.text,
                    connection=url_conn['href'],
                    date=datetime.now().utcnow()
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
