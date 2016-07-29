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


    render : function(){
        var orders = this.props.orders.map(function(item){
            return <OrderItem key={item.SN} order={item} updateOrder={this.props.updateOrder} deleteOrder={this.props.deleteOrder}/>
        }.bind(this));
        return (
           <div>
               <div className="section row">
                   <h2 >订单列表</h2>
                   <div >
                       <div >
                           起始日期:
                           <input ref="startDate" name="startDate"  type="date" className="validate"/>
                       </div>
                        <div >
                           终止日期:
                           <input ref="endDate" name="endDate" type="date" className="validate"/>
                       </div>
                       <div>
                           <button onClick={this.handleSearch} className="btn-floating btn-large waves-effect waves-light blue lighten-1">
                               <i className="material-icons">search</i>
                           </button>
                       </div>
                   </div>
               </div>
               <div>
                   <table className="highlight responsive-table">
                   <thead>
                       <tr>
                           <th>客户</th>
                           <th>流水号</th>
                           <th>文件名</th>
                           <th>状态</th>
                           <th>操作</th>
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