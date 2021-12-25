class Coin:
    name_attr = 'name'
    price_attr = 'price'
    market_cap_attr = 'market_cap'
    volume_24_attr = 'obseg_24h'

    def __init__(self, name, price,  market_cap, obseg_24h):
        self.name = name
        self.obseg_24h = obseg_24h
        self.price = price
        self.market_cap = market_cap

    def __str__(self):
        return '{ ' + f'"name": "{self.name}", "price": "{self.price}"' + ' }'

    def __repr__(self):
        return str(self)

