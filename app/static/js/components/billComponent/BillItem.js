var React = require("react");
var ReactDOM = require('react-dom');


var BillItem = React.createClass({
    handleUpdate: function (sn, status) {
        this.props.updateBill(sn, status);
    },
    handleDelete: function (sn,id) {
        this.props.deleteBill(sn,id);
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
                    <button  className="btn btn-raised btn-danger">更新</button>
                    <button onClick={this.handleDelete.bind(this,this.props.orderSN,b.id)} className="btn btn-raised btn-danger">删除</button>
                </td>
            </tr>
        )
    }
})


module.exports = BillItem;