import os


class CoinFile:
    file_attr = 'file'
    folder_attr = 'folder'

    def __init__(self, file, folder):
        self.file = file
        self.folder = folder

    def __str__(self):
        return '{ ' + f'"file": "{self.file}", "folder": "{self.folder}"' + ' }'

    def __repr__(self):
        return str(self)

    def file_location(self):
        if self.folder.index('/') < (len(self.folder) - 1):
            return f'{self.folder}/{self.file}'
        return f'{self.folder}{self.file}'

    def create_folder(self):
        if not os.path.exists(self.folder):
            os.mkdir(self.folder)
            return True
        return False
