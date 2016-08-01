var React = require('react');

var OrderItem = React.createClass({
    handleUpdate : function(sn,status){
        this.props.updateOrder(sn,status);
    },
    handleDelete : function(sn){
        this.props.deleteOrder(sn);

    },
    render : function(){
        var o = this.props.order;
        var updateBtn;

        if(o.status == 0){
            updateBtn =  <button onClick={this.handleUpdate.bind(this,o.sn,1)} className="btn waves-effect waves-light deep-purple lighten-2">完成</button>
        }else{
            updateBtn = <button className="btn disabled">完成</button>
        }

        return (
           <tr>
               <td>{ o.clientname }</td>
               <td>{ o.sn}</td>
               <td>{ o.filename }</td>
               <td>{ o.status == 0 ? '未完成':'已完成' }</td>
               <td>
                   {updateBtn}
                   <button  onClick={this.handleDelete.bind(this,o.sn)} className="btn waves-effect waves-light red darken-3">删除</button>
               </td>
           </tr>
        )
    }
});

module.exports = OrderItem;