from app import app
from flask import render_template,request,redirect,url_for

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/page1')
def page1():
    return render_template('index.html')

@app.route('/page2')
def page2():
    return render_template('index.html')
