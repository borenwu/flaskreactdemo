var React = require('react');
var ReactDOM = require('react-dom');
var OrderItem = require('./OrderItem');

var OrderTable = React.createClass({

    handleSearch : function(e){
        console.log('search start!')
        e.preventDefault();
        var startDate = ReactDOM.findDOMNode(this.refs.startDate).value.trim();
        var endDate = ReactDOM.findDOMNode(this.refs.endDate).value.trim();
        console.log(startDate)
        console.log(endDate)
        if(!startDate || !endDate){
            return;
        }
        this.props.searchOrder(startDate,endDate);

        //ReactDOM.findDOMNode(this.refs.startDate).value = "";
        //ReactDOM.findDOMNode(this.refs.endDate).value = "";
    },

    handleOutput : function(e){
        console.log('output start!')
        e.preventDefault();

        $("#table_wrapper").table2excel({
            name: "Excel Document Name",
            filename: "myFileName",
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    },


    render : function(){
        var orders = this.props.orders.map(function(item){
            return <OrderItem key={item.SN} order={item} updateOrder={this.props.updateOrder} deleteOrder={this.props.deleteOrder}/>
        }.bind(this));
        return (
           <div>
               <div className="row">
                   <h2 className="center-align">订单列表</h2>
                   <div >
                       <div className="col s4">
                           起始日期:
                           <input ref="startDate" name="startDate"  type="date" className="validate"/>
                            终止日期:
                           <input ref="endDate" name="endDate" type="date" className="validate"/>
                       </div>

                       <div className="col s8 orderTableOps">
                           <button id="btnSearch" className="btn waves-effect waves-light blue accent-2" onClick={this.handleSearch}>
                               <i className="material-icons left">search</i>
                               搜索
                           </button>
                           <button id="btnOutput" className="btn waves-effect waves-light deep-purple lighten-2" onClick={this.handleOutput}>
                               <i className="material-icons left">description</i>
                               导出
                           </button>
                       </div>
                   </div>
               </div>
               <div>
                   <table id="table_wrapper" className="bordered highlight responsive-table">
                   <thead>
                       <tr>
                           <th className="blue-grey-text text-darken-1">客户</th>
                           <th className="blue-grey-text text-darken-1">流水号</th>
                           <th className="blue-grey-text text-darken-1">文件名</th>
                           <th className="blue-grey-text text-darken-1">状态</th>
                           <th className="blue-grey-text text-darken-1">操作</th>
                       </tr>
                    </thead>
                    <tbody>
                    {orders}
                    </tbody>
                </table>
               </div>
           </div>
        )
    }
});

module.exports = OrderTable;