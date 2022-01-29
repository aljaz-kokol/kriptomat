import json


class Coin:
    name_attr = 'name'
    price_attr = 'price'
    market_cap_attr = 'market_cap'
    volume_24_attr = 'volume_24h'
    connection_attr = 'connection'
    date_attr = 'date'

    def __init__(self, name, price, market_cap, volume_24h, connection, date):
        self.name = name
        self.volume_24h = volume_24h
        self.price = price
        self.market_cap = market_cap
        self.connection = connection
        self.date = date

    def __str__(self):
        return '\n{ ' + \
               f'"{self.name_attr}": "{self.name}", ' \
               f'"{self.price_attr}": "{self.price}", ' \
               f'"{self.market_cap_attr}": "{self.market_cap}", ' \
               f'"{self.volume_24_attr}": "{self.volume_24h}", ' \
               f'"{self.connection_attr}": "{self.connection}", ' \
               f'"{self.date_attr}": "{self.date}"' \
               '}'

    def __repr__(self):
        return str(self)

    def to_json(self):
        return {
            self.name_attr: self.name,
            self.price_attr: self.price,
            self.market_cap_attr: self.market_cap,
            self.volume_24_attr: self.volume_24h,
            self.connection_attr: self.connection,
            self.date_attr: self.date
        }
