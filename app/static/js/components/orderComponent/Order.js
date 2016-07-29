var React = require("react");
var OrderForm = require('./OrderForm');
var OrderTable = require('./OrderTable');


var Order = React.createClass({
    getInitialState : function () {
       return{
           orders : []
       }
    },

    todayOrders : function () {
        $.ajax({
            type : 'get',
            url : '/orders/list'
        }).done(function(resp){
            if(resp.status == "success"){
                this.setState({orders:resp.orders});
            }
        }.bind(this))
    },

    searchOrder : function (startDate,endDate) {
        $.ajax({
            type : 'post',
            url : '/orders/list',
            data: {start:startDate,end:endDate}
        }).done(function(resp){
            if(resp.status == "success"){
                this.setState({orders:resp.orders});
            }
        }.bind(this))
    },

    addOrder : function(client,filename){
        $.ajax({
            type : 'post',
            url : '/orders/add',
            data : {client:client,filename:filename}
        }).done(function (resp) {
            if(resp.status == "success"){
                this.todayOrders();
            }
        }.bind(this))
    },


    deleteOrder : function(sn){
         $.ajax({
            type : 'get',
            url : '/orders/delete/'+sn
        }).done(function(resp){
            console.log(resp);
            if(resp.status == 'success'){
                this.todayOrders();
            }
        }.bind(this))

    },


    updateOrder : function(sn,status){
        $.ajax({
            type : 'post',
            url : '/orders/update',
            data : {sn:sn,status:status}
        }).done(function (resp) {
            if(resp.status == "success"){
                this.todayOrders();
            }
        }.bind(this))
    },

    componentDidMount : function(){
        this.todayOrders();
    },

    render : function(){
        return(
            <div>
                <div>
                    <OrderForm addOrder = {this.addOrder} />
                </div>
                <div>
                    <OrderTable orders = {this.state.orders}
                                searchOrder = {this.searchOrder}
                                updateOrder={this.updateOrder}
                                deleteOrder = {this.deleteOrder}/>
                </div>

            </div>
        )
    }

})


module.exports = Order;