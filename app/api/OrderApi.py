from app import app
from app import db
from flask import render_template, request, jsonify
from app.models.OrderModel import Order, Bill, Operation
from datetime import *


@app.route('/orders/add', methods=['POST', ])
def add():
    form = request.form
    client = form.get('client')
    filename = form.get('filename')
    now = datetime.now()
    today = now.strftime('%Y-%m-%d %H:%M:%S')
    sn = datetime.strftime(now, '%Y%m%d%H%M%S')
    order = Order(clientname=client, filename=filename, SN=sn, date=today, status=False)
    order.save()
    return jsonify(status="success")


@app.route('/orders/list', methods=['POST', 'GET'])
def list():
    if request.method == 'POST':
        print "post"
        form = request.form
        # print args.isempty()
        try:
            start = form['start']
            end = form['end']
            oneday = timedelta(days=1)
            endDate = datetime.strptime(end, "%Y-%m-%d")
            newEnd = (endDate + oneday).strftime("%Y-%m-%d")

            orders = Order.query.filter((Order.date >= start) & (Order.date < newEnd))
            return jsonify(status="success", orders=[order.to_json() for order in orders])
        except Exception, e:
            print e
            return jsonify(status="fail")

    else:
        now = datetime.now()
        oneday = timedelta(days=1)
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


@app.route('/orders/update', methods=['POST', ])
def update():
    form = request.form
    sn = form.get('sn')

    try:
        order = Order.query.filter_by(SN=sn).first_or_404()
        new_status = form.get('status')
        order.status = new_status
        order.update()
        return jsonify(status="success")
    except Exception, e:
        print e
        return jsonify(status="fail")


@app.route('/orders/bills/add', methods=['POST', ])
def addBill():
    form = request.form
    sn = form.get('sn')
    try:
        order = Order.query.filter_by(SN=sn).first_or_404()
        name = form.get('name')
        color = form.get('color')
        type = form.get('type')
        weight = form.get('weight')
        size = form.get('size')
        unit = form.get('unit')
        amount = form.get('amount')
        bill = Bill(name=name, color=color, type=type, weight=weight, size=size, unit=unit, amount=amount)
        order.bills.append(bill)
        order.update()
        return jsonify(status="success")
    except Exception, e:
        print e
        return jsonify(status="fail")


@app.route('/orders/bills/update', methods=['POST', ])
def updateBill():
    form = request.form
    sn = form.get('sn')
    id = form.get('id')
    print sn
    print id
    try:
        order = Order.query.filter_by(SN=sn).first_or_404()
        bill = order.bills.filter_by(id=id)[0]
        bill.name = form.get('name')
        bill.color = form.get('color')
        bill.type = form.get('type')
        bill.weight = form.get('weight')
        bill.size = form.get('size')
        bill.unit = form.get('unit')
        bill.amount = form.get('amount')
        bill.update()
        return jsonify(status="success")
    except Exception, e:
        print e
        return jsonify(status="fail")


@app.route('/orders/bills/delete', methods=['POST', ])
def deleteBill():
    form = request.form
    sn = form.get('sn')
    id = form.get('id')
    try:
        order = Order.query.filter_by(SN=sn).first_or_404()
        bill = order.bills.filter_by(id=id)[0]
        bill.delete()
        return jsonify(status="success")
    except Exception, e:
        print e
        return jsonify(status="fail")


@app.route('/orders/operations/add', methods=['POST', ])
def addOp():
    form = request.form
    sn = form.get('sn')
    try:
        order = Order.query.filter_by(SN=sn).first_or_404()
        name = form.get('name')
        op = Operation(name=name)
        order.operations.append(op)
        order.update()
        return jsonify(status="success")
    except Exception, e:
        print e
        return jsonify(status="fail")


@app.route('/orders/operations/update', methods=['POST', ])
def updateOp():
    form = request.form
    sn = form.get('sn')
    id = form.get('id')
    try:
        order = Order.query.filter_by(SN=sn).first_or_404()
        op = order.operations.filter_by(id=id)[0]
        op.name = form.get('name')
        op.update()
        return jsonify(status="success")
    except Exception, e:
        print e
        return jsonify(status="fail")


@app.route('/orders/operations/delete', methods=['POST', ])
def deleteOp():
    form = request.form
    sn = form.get('sn')
    id = form.get('id')
    try:
        order = Order.query.filter_by(SN=sn).first_or_404()
        op = order.operations.filter_by(id=id)[0]
        op.delete()
        return jsonify(status="success")
    except Exception, e:
        print e
        return jsonify(status="fail")

