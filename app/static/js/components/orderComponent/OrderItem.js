var React = require('react');
var Bill = require('../billComponent/Bill');
var ReactDOM = require('react-dom');

var OrderItem = React.createClass({
    getInitialState: function () {
        return {
            bills: []
        }
    },

    getBills: function () {
        var o = this.props.order;
        $.ajax({
            type: 'post',
            url: '/orders/bills/list',
            data: {sn: o.sn}
        }).done(function (resp) {
            if (resp.status == "success") {
                this.setState({bills: resp.bills});
            }
        }.bind(this))
    },

    componentDidMount: function () {
        this.getBills();
    },

    addBill: function (sn, name, color, type, weight, size, unit, amount) {
        $.ajax({
            type: 'post',
            url: '/orders/bills/add',
            data: {
                sn: sn,
                name: name,
                color: color,
                type: type,
                weight: weight,
                size: size,
                unit: unit,
                amount: amount
            }
        }).done(function (resp) {
            if (resp.status == "success") {
                this.getBills();
            }
        }.bind(this))
    },


    deleteBill: function (sn, id) {
        $.ajax({
            type: 'post',
            url: '/orders/bills/delete',
            data: {sn: sn, id: id}
        }).done(function (resp) {
            console.log(resp);
            if (resp.status == 'success') {
                this.getBills();
            }
        }.bind(this))
    },


    updateBill: function (sn, id, name, color, type, weight, size, unit, amount) {
        $.ajax({
            type: 'post',
            url: '/orders/bills/update',
            data: {
                sn: sn,
                id: id,
                name: name,
                color: color,
                type: type,
                weight: weight,
                size: size,
                unit: unit,
                amount: amount
            }
        }).done(function (resp) {
            if (resp.status == "success") {
                this.getBills();
            }
        }.bind(this))
    },

    handleUpdate: function (sn, status) {
        this.props.updateOrder(sn, status);
    },
    handleDelete: function (sn) {
        this.props.deleteOrder(sn);

    },
    handleHref: function () {
        var o = this.props.order;
        return '#' + o.sn;
    },

    handleModalRef: function () {
        var sn = this.props.order.sn
        return '#' + sn;
    },

    handleTaskInfo: function () {
        console.log('task info')
    },

    render: function () {
        var o = this.props.order;
        var updateBtn;

        if (o.status == 0) {
            updateBtn =
                <button onClick={this.handleUpdate.bind(this,o.sn,1)} className="btn btn-raised btn-info">完成</button>
        } else {
            updateBtn = <button className="btn btn-raised disabled" style={{color: '#ef9a9a'}}>完成</button>
        }

        return (
            <li>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="material-icons">place</i>
                        <a id="clientRef" data-toggle="collapse" href={this.handleHref()} aria-expanded="false"
                           aria-controls="collapseExample2">
                            { o.clientname }
                        </a>
                    </div>
                    <div className="collapse" id={o.sn}>
                        <table id="tableExample" className="table table-bordered">
                            <thead>
                            <tr>
                                <th>流水号</th>
                                <th>文件名</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{ o.sn}</td>
                                <td>{ o.filename }</td>
                                <td>{ o.status == 0 ? '未完成' : '已完成' }</td>
                                <td>
                                    {updateBtn}
                                    <button className="btn btn-raised btn-warning"
                                            onClick={this.handleDelete.bind(this,o.sn)}>删除
                                    </button>
                                    <button className="btn btn-raised btn-success" data-toggle="modal"
                                            data-target="#billModal" onClick={this.handleTaskInfo}>任务明细
                                    </button>
                                    <button className="btn btn-raised btn-success" data-toggle="modal"
                                            data-target="#recordModal">领料
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bill
                        orderSN={this.props.order.sn}
                        bills={this.state.bills}
                        addBill={this.addBill}
                        updateBill={this.updateBill}
                        deleteBill={this.deleteBill}/>
                </div>
            </li>

            //<tr>
            //    <td>{ o.clientname }</td>
            //    <td>{ o.sn}</td>
            //    <td>{ o.filename }</td>
            //    <td>{ o.status == 0 ? '未完成':'已完成' }</td>
            //    <td>
            //        {updateBtn}
            //        <button  onClick={this.handleDelete.bind(this,o.sn)} className="btn waves-effect waves-light red darken-3">删除</button>
            //    </td>
            //</tr>
        )
    }
});

module.exports = OrderItem;