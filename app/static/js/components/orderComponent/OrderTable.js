var React = require('react');
var ReactDOM = require('react-dom');
var OrderItem = require('./OrderItem');

var OrderTable = React.createClass({

    handleSearch: function (e) {
        console.log('search start!')
        e.preventDefault();
        var startDate = ReactDOM.findDOMNode(this.refs.startDate).value.trim();
        var endDate = ReactDOM.findDOMNode(this.refs.endDate).value.trim();
        console.log(startDate)
        console.log(endDate)
        if (!startDate || !endDate) {
            return;
        }
        this.props.searchOrder(startDate, endDate);

        //ReactDOM.findDOMNode(this.refs.startDate).value = "";
        //ReactDOM.findDOMNode(this.refs.endDate).value = "";
    },

    //handleOutput : function(e){
    //    console.log('output start!')
    //    e.preventDefault();
    //
    //    $("#table_wrapper").table2excel({
    //        name: "Excel Document Name",
    //        filename: "myFileName",
    //        fileext: ".xls",
    //        exclude_img: true,
    //        exclude_links: true,
    //        exclude_inputs: true
    //    });
    //},


    render: function () {
        var orders = this.props.orders.map(function (item) {
            return <OrderItem key={item.SN} order={item} updateOrder={this.props.updateOrder}
                              deleteOrder={this.props.deleteOrder}/>
        }.bind(this));
        return (
            <div className="container">
                <div>
                    <h2 className="orderListTitle">订单列表</h2>
                    <form className="form-inline searchOrderForm">
                        <div className="form-group">
                            <label className="sr-only" htmlFor="startDate">起始日期</label>
                            <input type="date" className="form-control" id="startDate" ref="startDate"/>
                        </div>

                        <div className="form-group">
                            <label className="sr-only" htmlFor="endDate">终止日期</label>
                            <input type="date" className="form-control" id="endDate" ref="endDate"/>
                        </div>
                        <button type="submit" className="btn btn-raised btn-info" onClick={this.handleSearch}>
                            <i className="material-icons left">search</i>
                            搜索
                        </button>
                    </form>
                </div>
                <div>
                    <ul className="order-list">
                        <li>
                            {orders}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
});

module.exports = OrderTable;