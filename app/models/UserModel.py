# -*- coding: utf-8 -*-

from app import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(320), unique=True)
    email = db.Column(db.String(320), unique=True)

    def __repr__(self):
        return '<User %r>' % self.username

