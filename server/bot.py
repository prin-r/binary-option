from config import CONTRACT_ADDRESS
from util import play, get_data
import time
import random

while True:
    time.sleep(random.randint(3600, 7200))
    data = get_data()
    time.sleep(45)
    print(play(CONTRACT_ADDRESS, data))

