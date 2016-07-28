# -*- coding: utf-8 -*-

from app import db


class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    clientname = db.Column(db.String(320), unique=True)
    SN = db.Column(db.String(320), unique=True)
    filename = db.Column(db.String(320), unique=True)
    date = db.Column(db.DateTime)
    status = db.Column(db.Boolean)

    def __repr__(self):
        return '<User %r>' % self.clientname

    def to_json(self):
        return {
            'id': str(self.id),
            'clientname': self.clientname,
            'sn':self.SN,
            'filename':self.filename,
            'date': self.date.__str__(),
            'status': self.status
        }

    def save(self):
        db.session.add(self)
        db.session.commit()
        return self

    def update(self):
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return self