var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-bootstrap/lib/Modal');
var BillItem = require('../billComponent/BillItem');

var OrderItem = React.createClass({
    getInitialState: function () {
        return {
            bills: [],
            showBillModal: false,
            showAddBill: false
        }
    },

    billModalClose: function () {
        this.setState({showBillModal: false});
    },

    billModalOpen: function () {
        this.setState({showBillModal: true});
    },

    addBillClose: function () {
        this.setState({showAddBill: false});
    },

    addBillOpen: function () {
        this.setState({showAddBill: true});
    },


    getBills: function () {
        $.ajax({
            type: 'post',
            url: '/orders/bills/list',
            data: {sn: this.props.order.sn}
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
            data: {sn: sn, id: id, name: name, color: color, type: type, weight: weight, size: size, unit: unit, amount: amount}
        }).done(function (resp) {
            if (resp.status == "success") {
                alert('更新完成')
                //this.getBills();
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

    addBillHandler: function (e) {
        e.preventDefault();
        var sn = this.props.order.sn
        console.log(sn)
        var name = ReactDOM.findDOMNode(this.refs.itemName).value.trim();
        var color = ReactDOM.findDOMNode(this.refs.itemColor).value.trim();
        var type = ReactDOM.findDOMNode(this.refs.itemType).value.trim();
        var weight = ReactDOM.findDOMNode(this.refs.itemWeight).value.trim();
        var size = ReactDOM.findDOMNode(this.refs.itemSize).value.trim();
        var unit = ReactDOM.findDOMNode(this.refs.itemUnit).value.trim();
        var amount = ReactDOM.findDOMNode(this.refs.itemAmount).value.trim();

        this.addBill(sn, name, color, type, weight, size, unit, amount);
    },

    render: function () {
        var bills = this.state.bills.map(function (item) {
            return <BillItem key={item.id}
                             bill={item}
                             orderSN={this.props.order.sn}
                             updateBill={this.updateBill}
                             deleteBill={this.deleteBill}/>
        }.bind(this));
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
                                            onClick={this.billModalOpen}>任务明细
                                    </button>
                                    <button className="btn btn-raised btn-success" data-toggle="modal"
                                            data-target="#recordModal">领料
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Modal bsSize="large" show={this.state.showBillModal} onHide={this.billModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>任务明细</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>名称</th>
                                    <th>色彩</th>
                                    <th>纸张类型</th>
                                    <th>纸张克重</th>
                                    <th>纸张尺寸</th>
                                    <th>单位</th>
                                    <th>数量</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {bills}
                                </tbody>
                            </table>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-raised btn-info" onClick={this.addBillOpen}>
                                添加清单
                            </button>
                            <button type="button" className="btn btn-raised btn-default"
                                    onClick={this.billModalClose}>
                                关闭
                            </button>
                        </Modal.Footer>
                    </Modal>


                    <Modal bsSize="large" show={this.state.showAddBill} onHide={this.addBillClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>添加清单</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form className="form-bill" onSubmit={this.addBillHandler}>
                                <div className="form-group">
                                    <label htmlFor="itemName">名称</label>
                                    <input type="text" className="form-control" id="itemName"
                                           ref="itemName"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="itemColor">色彩</label>
                                    <input type="text" className="form-control" id="itemColor"
                                           ref="itemColor"/>
                                </div>

                                <div className="form-group">
                                    <label for="itemType">纸张类型</label>
                                    <select className="form-control" id="itemType" ref="itemType">
                                        <option>铜版纸</option>
                                        <option>双胶纸</option>
                                        <option>皮纹纸</option>
                                        <option>其他</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="itemWeight">纸张克重</label>
                                    <input type="text" className="form-control" id="itemWeight"
                                           ref="itemWeight"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="itemSize">纸张尺寸</label>
                                    <input type="text" className="form-control" id="itemSize"
                                           ref="itemSize"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="itemUnit">单位</label>
                                    <select className="form-control" id="itemUnit" ref="itemUnit">
                                        <option>张</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="itemAmount">数量</label>
                                    <input type="text" className="form-control" id="itemAmount"
                                           ref="itemAmount"/>
                                </div>

                                <button type="submit" className="btn btn-lg btn-raised btn-block">
                                    提交
                                </button>
                            </form>
                        </Modal.Body>
                    </Modal>
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