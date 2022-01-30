from bs4 import BeautifulSoup
from selenium import webdriver
import time


class HTMLReader:
    __chrome_driver_path = './driver/chromedriver.exe'

    def __init__(self, page_url: str, cookie_button_id: str = None):
        self.__page_url = page_url
        self.__cookie_button_id = cookie_button_id
        self.__html = self.__html = self.fetch_html()

    def get_html(self):
        return self.__html

    def get_element_list_by_tag(self, tag_name: str, attributes: dict):
        soup = BeautifulSoup(self.__html, 'lxml')
        return soup.findAll(tag_name, attrs=attributes)

    def fetch_html(self):
        try:
            options = webdriver.ChromeOptions()
            options.add_experimental_option('excludeSwitches', ['enable-logging'])
            browser = webdriver.Chrome(executable_path=self.__chrome_driver_path, options=options)
            browser.get(self.__page_url)
            time.sleep(2)

            try:
                browser.find_element('id', self.__cookie_button_id).click()
            except:
                print(f'Button with id: "{self.__cookie_button_id}" does not exist')

            time.sleep(7)
            self.__html = browser.page_source
            browser.close()
            browser.quit()
        except:
            print(f'There was an error while fetching data from: "{self.__page_url}"')
            self.__html = ''

        return self.__html

