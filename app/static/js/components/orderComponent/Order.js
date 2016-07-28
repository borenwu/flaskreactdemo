var React = require("react");
var OrderForm = require('./OrderForm');


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
                this.setState({orders:resp.todos});
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
            data : {sn:id,status:status}
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
                <OrderForm addOrder = {this.addOrder} />
            </div>
        )
    }

})


module.exports = Order;