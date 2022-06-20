from datetime import datetime
import re
import time
from models.html_reader import HTMLReader
import re


class Coin:
    __base_image_link = 'https://kriptomat.io/wp-content/uploads/icons/'
    __base_connection_link = 'https://kriptomat.io/cryptocurrency-prices/'

    name_attr = 'n'
    price_attr = 'p'
    short_name_attr = 't'

    def __init__(self, name, price, short_name, date=datetime.now()):
        self.name = name
        self.price = price
        self.short_name = short_name
        self.date = date

    @staticmethod
    def from_json(jsonObject):
        return Coin(
            name=jsonObject[Coin.name_attr],
            price=jsonObject[Coin.price_attr],
            short_name=jsonObject[Coin.short_name_attr],
            date=datetime.now()
        )

    @property
    def image(self):
        return f'{self.__base_image_link}{self.short_name}.svg'

    @property
    def connection(self):
        formattedName = f'{self.name}'
        formattedName = re.sub('[^A-Za-z0-9]+', ' ', formattedName)
        formattedName = formattedName.replace(' ', '-')
        return f'{self.__base_connection_link}{formattedName}-{self.short_name}-price/'

    def __str__(self):
        return '\n{ ' + \
               f'"name": "{self.name}", ' \
               f'"lastPrice": {self.price}, ' \
               f'"shortName": "{self.short_name}", ' \
               f'"connection": "{self.connection}", ' \
               f'"image": "{self.image}", ' \
               f'"date": "{self.date}"' \
               '}'

    def __repr__(self):
        return str(self)
