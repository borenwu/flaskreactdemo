from app import app
from app import db
from flask import render_template,request, jsonify
from app.models.OrderModel import Order
from datetime import *


@app.route('/orders/add', methods=['POST',])
def add():
    form = request.form
    client = form.get('client')
    filename = form.get('filename')
    now = datetime.now()
    today = now.strftime('%Y-%m-%d %H:%M:%S')
    sn = datetime.strftime(now,'%Y%m%d%H%M%S')
    order = Order(clientname=client, filename=filename,SN=sn,date=today,status=False)
    order.save()
    return jsonify(status="success")

@app.route('/orders/list',methods=['POST','GET'])
def list():
    if request.method == 'POST':
        form = request.form
        # print args.isempty()
        try:
            start = form['start']
            end = form['end']
            orders = Order.query.filter((Order.date > start) & (Order.date < end))
            return jsonify(status="success", orders=[order.to_json() for order in orders])
        except:
            return jsonify(status="fail")

    else:
        now = datetime.now()
        oneday=timedelta(days=1)
        tomorrow = (now + oneday).strftime('%Y-%m-%d')
        today = now.strftime('%Y-%m-%d')
        orders = Order.query.filter((Order.date > today) & (Order.date < tomorrow))
        return jsonify(status="success", orders=[order.to_json() for order in orders])


@app.route('/orders/delete/<string:sn>')
def delete(sn):
    order = Order.query.filter_by(SN=sn).first_or_404()
    if order:
        order.delete()
        return jsonify(status="success")
    else:
        return jsonify(status="fail")


@app.route('/orders/update', methods=['POST',])
def update():
    form = request.form
    sn = form.get('sn')

    try:
        order = Order.query.filter_by(SN=sn).first_or_404()
        new_status = form.get('status')
        order.status = new_status
        order.update()
        return jsonify(status="success")
    except Exception,e:
        print e
        return jsonify(status="fail")
