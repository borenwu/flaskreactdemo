var React = require("react");
var ReactDOM = require('react-dom');
var BillItem = require('./BillItem');


var Bill = React.createClass({

    //getInitialState : function () {
    //   return{
    //       orders : []
    //   }
    //},


    handleModalID: function () {
        var sn = this.props.orderSN
        return sn;
    },

    handleAddBill: function (e) {
        e.preventDefault();
        var sn = this.props.orderSN
        console.log(sn)
        var name = ReactDOM.findDOMNode(this.refs.itemName).value.trim();
        var color = ReactDOM.findDOMNode(this.refs.itemColor).value.trim();
        var type = ReactDOM.findDOMNode(this.refs.itemType).value.trim();
        var weight = ReactDOM.findDOMNode(this.refs.itemWeight).value.trim();
        var size = ReactDOM.findDOMNode(this.refs.itemSize).value.trim();
        var unit = ReactDOM.findDOMNode(this.refs.itemUnit).value.trim();
        var amount = ReactDOM.findDOMNode(this.refs.itemAmount).value.trim();

        this.props.addBill(sn, name, color, type, weight, size, unit, amount);
    },

    handleModalClose: function(){
        console.log('modal close')
        $("#billModal").removeData("bs.modal");
    },

    render: function () {
        var sn = this.props.orderSN
        var bills = this.props.bills.map(function (item) {
            return <BillItem key={item.id}
                             bill={item}
                             orderSN={this.props.orderSN}
                             updateBill={this.props.updateBill}
                             deleteBill={this.props.deleteBill}/>
        }.bind(this));

        return (
            <div>
                <div className="modal fade" id="billModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="billModalLabel">任务明细</h4>
                            </div>
                            <div className="modal-body">
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
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-raised btn-info" data-toggle="modal"
                                        data-target="#addBillModal">添加清单
                                </button>
                                <button type="button" className="btn btn-raised btn-default"
                                        data-dismiss="modal"
                                        onClick={this.handleModalClose}>
                                    关闭
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="addBillModal" tabindex="-1" role="dialog"
                     aria-labelledby="myModalLabel" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">清单项目</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-bill" onSubmit={this.handleAddBill}>
                                    <div className="form-group">
                                        <label htmlFor="itemName">名称</label>
                                        <input type="text" className="form-control" id="itemName" ref="itemName"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="itemColor">色彩</label>
                                        <input type="text" className="form-control" id="itemColor" ref="itemColor"/>
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
                                        <input type="text" className="form-control" id="itemWeight" ref="itemWeight"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="itemSize">纸张尺寸</label>
                                        <input type="text" className="form-control" id="itemSize" ref="itemSize"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="itemUnit">单位</label>
                                        <select className="form-control" id="itemUnit" ref="itemUnit">
                                            <option>张</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="itemAmount">数量</label>
                                        <input type="text" className="form-control" id="itemAmount" ref="itemAmount"/>
                                    </div>

                                    <button type="submit" className="btn btn-lg btn-raised btn-block">
                                        提交
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})


module.exports = Bill;