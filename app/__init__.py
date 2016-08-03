# -*- coding: utf-8 -*-

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import sqlalchemy
from config import dbinfo,localinfo
from datetime import *
import time

app = Flask(__name__)

### product
# app.config['SQLALCHEMY_DATABASE_URI'] = dbinfo
# app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
# db = SQLAlchemy(app)
# from models.UserModel import User
# db.create_all()


### dev
app.config['SQLALCHEMY_DATABASE_URI'] = localinfo
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
db = SQLAlchemy(app)
from models.UserModel import User
from models.OrderModel import Order, Bill, Operation
db.create_all()


# clientname = '汤姆'
# client = clientname.decode('utf-8')
# filename = '我的奋斗'.decode('utf-8')
#
# now = datetime.now()
# sn = datetime.strftime(now,'%Y%m%d%H%M%S')
# o = Order(clientname=client, filename=filename,SN=sn,date=now,status=False)
#
# name = '封面'.decode('utf-8')
# color = '双彩'.decode('utf-8')
# type = '铜版纸'.decode('utf-8')
# weight = 250
# unit = '张'.decode('utf-8')
# amount = 30
# b = Bill(name=name,color=color,type=type,weight=weight,unit=unit,amount=amount)
# o.bills.append(b)

# name = '内芯'.decode('utf-8')
# color = '黑白'.decode('utf-8')
# type = '双胶纸'.decode('utf-8')
# weight = 70
# unit = '张'.decode('utf-8')
# amount = 200
# b2 = Bill(name=name,color=color,type=type,weight=weight,unit=unit,amount=amount)


# try:
#     # db.session.add(o)
#     # db.session.add(b)
#     # db.session.commit()
#     sn = '20160802113554'
#     order = Order.query.filter_by(SN=sn).first_or_404()
#     order.delete()
#     # order.bills.append(b2)
#     # db.session.commit()
# except Exception,e:
#     print e
#     print 'user is already in'
#     db.session.close()
#     pass
# sn = '20160802115710'
# id = 2
# order = Order.query.filter_by(SN=sn).first_or_404()
# bill = order.bills.filter_by(id=id)[0]
# print bill.name


from app import views
from app.api import *