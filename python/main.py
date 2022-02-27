from services.database_service import DatabaseService
from services.kriptomat_service import KriptomatService
import schedule
import time
from datetime import datetime
import requests


kriptomat_service = KriptomatService()
db_service = DatabaseService()

def main():
    coins = kriptomat_service.get_coins()
    db_service.insert_coins(coins)
    print(f'Number of coins: {len(coins)}')
    print(f'{datetime.now()} Finished\n')


main()

schedule.every(2).hours.do(main)
print("Waiting for execution")
while 1:
    schedule.run_pending()
    time.sleep(1)

