var React = require('react');

var OrderItem = React.createClass({
    handleUpdate : function(sn,status){
        this.props.updateOrder(sn,status);
    },
    handleDelete : function(sn){
        this.props.deleteOrder(sn);

    },
    handleHref : function(){
        var o = this.props.order;
        return '#' + o.sn;
    },
    render : function(){
        var o = this.props.order;
        var updateBtn;

        if(o.status == 0){
            updateBtn =  <button onClick={this.handleUpdate.bind(this,o.sn,1)} className="btn btn-raised btn-info">完成</button>
        }else{
            updateBtn = <button className="btn btn-raised disabled" style={{color: '#ef9a9a'}}>完成</button>
        }

        return (
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
                            <td>{ o.status == 0 ? '未完成':'已完成' }</td>
                            <td>
                                {updateBtn}
                                <button className="btn btn-raised btn-warning" onClick={this.handleDelete.bind(this,o.sn)}>删除</button>
                                <button className="btn btn-raised btn-success" data-toggle="modal" data-target="#billModal">任务明细
                                </button>
                                <button className="btn btn-raised btn-success" data-toggle="modal" data-target="#recordModal">领料
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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