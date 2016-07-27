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
from models.OrderModel import Order
db.create_all()


clientname = '吉姆'
client = clientname.decode('utf-8')
filename = '公交出行路线图'.decode('utf-8')
o = Order(clientname=client, filename=filename,date=datetime.now(),status=False)
print o.to_json()
try:
    db.session.add(o)
    db.session.commit()
except Exception:
    print 'user is already in'
    db.session.close()
    pass


from app import views