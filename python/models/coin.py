from datetime import datetime
import re
import time
from models.html_reader import HTMLReader


class Coin:
    name_attr = 'name'
    price_attr = 'price'
    connection_attr = 'connection'
    svg_link_attr = 'svg_link'
    date_attr = 'date'

    def __init__(self, name, price, connection, svg_link, date=datetime.now()):
        self.name = name
        self.price = price
        self.connection = connection
        self.svg_link = svg_link
        self.date = date

    def __str__(self):
        return '\n{ ' + \
               f'"{self.name_attr}": "{self.name}", ' \
               f'"{self.price_attr}": "{self.price}", ' \
               f'"{self.connection_attr}": "{self.connection}", ' \
               f'"{self.connection_attr}": "{self.svg_link}", ' \
               f'"{self.date_attr}": "{self.date}"' \
               '}'

    def __repr__(self):
        return str(self)

    def to_json(self):
        return {
            self.name_attr: self.name,
            self.price_attr: self.price,
            self.connection_attr: self.connection,
            self.svg_link_attr: self.svg_link,
            self.date_attr: self.date
        }

    def get_svg_name(self):
        short_name = re.sub(r'[#%&{}<>*?/$!\'"@+`|=:\\]', '_', self.name)
        short_name = short_name.replace(' ', '_')
        return short_name;

    def download_svg(self):
        try:
            reader = HTMLReader(self.svg_link, cookie_button_wait=0, html_wait=1)
            open(f'../node-server/files/images/{self.get_svg_name()}.svg', 'w').write(reader.get_html())
            time.sleep(1)
        except:
            print(f'Error while trying to fetch svg for "{self.name}"')
