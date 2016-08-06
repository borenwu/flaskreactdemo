var React = require("react");
var ReactDOM = require('react-dom');
var Modal = require('react-bootstrap/lib/Modal');


var BillItem = React.createClass({
    getInitialState: function () {
        return {
            showUpdateBill: false
        }
    },

    updateBillClose: function () {
        this.setState({showUpdateBill: false});
    },

    updateBillOpen: function () {
        this.setState({showUpdateBill: true});
        console.log('update bill')
    },

    handleUpdate: function () {
        var sn = this.props.orderSN
        var id = this.props.bill.id
        var name = ReactDOM.findDOMNode(this.refs.updateItemName).value.trim();
        var color = ReactDOM.findDOMNode(this.refs.updateItemColor).value.trim();
        var type = ReactDOM.findDOMNode(this.refs.updateItemType).value.trim();
        var weight = ReactDOM.findDOMNode(this.refs.updateItemWeight).value.trim();
        var size = ReactDOM.findDOMNode(this.refs.updateItemSize).value.trim();
        var unit = ReactDOM.findDOMNode(this.refs.updateItemUnit).value.trim();
        var amount = ReactDOM.findDOMNode(this.refs.updateItemAmount).value.trim();
        this.props.updateBill(sn, id, name, color, type, weight, size, unit, amount);
    },
    handleDelete: function (sn, id) {
        this.props.deleteBill(sn, id);
    },
    render: function () {
        var b = this.props.bill

        return (
            <tr>
                <td>{ b.name }</td>
                <td>{ b.color}</td>
                <td>{ b.type }</td>
                <td>{ b.weight }</td>
                <td>{ b.size }</td>
                <td>{ b.unit }</td>
                <td>{ b.amount }</td>
                <td>
                    <button className="btn btn-raised btn-danger" onClick={this.updateBillOpen}>更新</button>
                    <button onClick={this.handleDelete.bind(this,this.props.orderSN,b.id)}
                            className="btn btn-raised btn-danger">删除
                    </button>
                </td>

                <Modal bsSize="large" show={this.state.showUpdateBill} onHide={this.updateBillClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>更新清单</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-bill" onSubmit={this.handleUpdate}>
                            <div className="form-group">
                                <label htmlFor="updateItemName">名称</label>
                                <input type="text" className="form-control" id="updateItemName"
                                       ref="updateItemName" defaultValue={b.name}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="updateItemColor">色彩</label>
                                <input type="text" className="form-control" id="updateItemColor"
                                       ref="updateItemColor" defaultValue={b.color}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="updateItemType">纸张类型</label>
                                <select className="form-control" id="itemType" ref="updateItemType" defaultValue={b.type}>
                                    <option>铜版纸</option>
                                    <option>双胶纸</option>
                                    <option>皮纹纸</option>
                                    <option>其他</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="updateItemWeight">纸张克重</label>
                                <input type="text" className="form-control" id="updateItemWeight"
                                       ref="updateItemWeight" defaultValue={b.weight}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="updateItemSize">纸张尺寸</label>
                                <input type="text" className="form-control" id="updateItemSize"
                                       ref="updateItemSize" defaultValue={b.size}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="updateItemUnit">单位</label>
                                <select className="form-control" id="itemUnit" ref="updateItemUnit" defaultValue={b.unit}>
                                    <option>张</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="updateItemAmount">数量</label>
                                <input type="text" className="form-control" id="updateItemAmount"
                                       ref="updateItemAmount" defaultValue={b.amount}/>
                            </div>

                            <button type="submit" className="btn btn-lg btn-raised btn-block">
                                提交
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            </tr>
        )
    }
})


module.exports = BillItem;