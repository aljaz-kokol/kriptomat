from pymongo import MongoClient
from models.coin import Coin
import requests

class DatabaseService:
    __db_name = 'kriptomat'
    __client = MongoClient(f'mongodb+srv://kokol:86yKC4SYHl1lwWef@cluster0.0tzsf.mongodb.net/{__db_name}?retryWrites=true&w=majority')
    __database = __client[__db_name]

    def insert_coins(self, coins: list[Coin]):
        new_coin_counter = 0
        coin_table_name = 'coins'
        price_table_name = 'prices'
        market_cap_table_name = 'market_caps'
        volumes_table_name = 'volumes'

        coin_collection = self.__database[coin_table_name]
        price_collection = self.__database[price_table_name]

        for coin in coins:
            coin_document = coin_collection.find_one({'name': coin.name})
            if not coin_document:
                coin.download_svg()
                result = coin_collection.insert_one({
                    'name': coin.name,
                    'connection': coin.connection,
                    'lastPrice': coin.price,
                    'image': f'{coin.get_svg_name()}.svg'
                })
                coin_id = result.inserted_id
                new_coin_counter = new_coin_counter + 1
            else:
                coin_id = coin_document['_id']
                coin_collection.update_one({'_id': coin_id}, {'$set': {'lastPrice': coin.price}})

            price_collection.insert_one({'price': coin.price, 'date': coin.date, 'coin_id': coin_id})
            print(f'"{coin.name}" data inserted')
        print(f'Number of new coins: {new_coin_counter}')
