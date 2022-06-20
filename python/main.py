from services.database_service import DatabaseService
from services.kriptomat_service import KriptomatAPIService
import schedule
import time
from datetime import datetime
import requests

kriptomat_api_service = KriptomatAPIService()
db_service = DatabaseService()
#
def main():
    print(f'{datetime.now()} --> Fetching data...')
    coins = kriptomat_api_service.fetch_coins_data()
    num_of_new_coins = db_service.insert_coins(coins)
    # print(coins)
    print(f'Number of coins: {len(coins)}')
    print(f'Number of new coins: {num_of_new_coins}')
    print(f'{datetime.now()} Finished\n')


main()

schedule.every(2).hours.do(main)
print("Waiting for execution")
while 1:
    schedule.run_pending()
    time.sleep(1)

