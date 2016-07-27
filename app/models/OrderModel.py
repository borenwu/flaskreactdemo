# -*- coding: utf-8 -*-

from app import db


class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    clientname = db.Column(db.String(320), unique=True)
    filename = db.Column(db.String(320), unique=True)
    date = db.Column(db.DateTime)
    status = db.Column(db.Boolean)

    def __repr__(self):
        return '<User %r>' % self.clientname

    def to_json(self):
        return {
            'id': str(self.id),
            'clientname': self.clientname,
            'filename':self.filename,
            'date': self.date.__str__(),
            'status': self.status
        }
