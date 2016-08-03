# -*- coding: utf-8 -*-

from app import db
from base import CRUD


class Order(db.Model, CRUD):
    __tablename__ = 'orders'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    clientname = db.Column(db.String(320))
    SN = db.Column(db.String(320), unique=True)
    filename = db.Column(db.String(320))
    date = db.Column(db.DateTime)
    status = db.Column(db.Boolean)
    bills = db.relationship('Bill', backref="order", cascade="all, delete-orphan", lazy='dynamic')
    operations = db.relationship('Operation', backref="order", cascade="all, delete-orphan", lazy='dynamic')

    def __repr__(self):
        return '<Order %r>' % self.clientname

    def to_json(self):
        return {
            'id': str(self.id),
            'clientname': self.clientname,
            'sn': self.SN,
            'filename': self.filename,
            'date': self.date.__str__(),
            'status': self.status,
        }


class Bill(db.Model, CRUD):
    __tablename__ = 'bills'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(320))
    color = db.Column(db.String(320))
    type = db.Column(db.String(320))
    weight = db.Column(db.Float)
    size = db.Column(db.String(320))
    unit = db.Column(db.String(320))
    amount = db.Column(db.Float)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))

    def __repr__(self):
        return '<Bill %r>' % self.name

    def to_json(self):
        return {
            'id': str(self.id),
            'order_id': self.order_id,
            'name': self.name,
            'color': self.color,
            'type': self.type,
            'weight': self.weight,
            'size': self.size,
            'unit': self.unit,
            'amount': self.amount
        }


class Operation(db.Model, CRUD):
    __tablename__ = 'operations'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(320))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))

    def __repr__(self):
        return '<Operation %r>' % self.name

    def to_json(self):
        return {
            'id': str(self.id),
            'name': self.name,
        }