import datetime
import matplotlib as mpl
import matplotlib.pyplot as plt
import numpy as np

class item:
    def __init__(item, name, price, store, date):
        item.name = name
        item.price = price
        item.store = store
        item.date = date

    def getName(item):
        return item.name

    def getPrice(item):
        return item.price

    def getStore(item):
        return item.store

    def getDate(item):
        return item.date

Apple = item("apple", 2.00, "safeway", "01/20/23")
Milk = item("milk", 5.37, "costco", "02/22/23")
Pasta = item("pasta", 7.11, "fred meyer", "01/30/23")
Soap = item("soap", 12.22, "costco", "02/22/23")
Mushroom = item("mushroom", 1.23, "safeway", "01/20/23")
Ham = item("ham", 14.44, "walmart", "12/13/22")
Artichoke = item("artichoke", 4.00, "costco", "02/22/23")
Banana = item("banana", 2.89, "costco", "02/22/23")

def weekly():
    fig, ax = plt.subplots()

    wks = ['Week 1', 'Week2', 'Week3', 'Week4']
    money = [14.44, 3.23, 7.11, 24.38]

    ax.bar(wks, money)

    ax.set_ylabel('Money Spent (in $)')
    ax.set_title('Weekly Spending over the last 4 weeks')

    plt.savefig("week1.png")

def monthly():
    pass
    
def quarterly():
    pass
    
def yearly():
    pass
    
def byStore():
    pass

weekly()