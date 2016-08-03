var React = require('react');
var ReactDOM = require('react-dom');

var OrderForm = React.createClass({

    handleSubmit: function (e) {
        e.preventDefault();
        var client = ReactDOM.findDOMNode(this.refs.client).value.trim();
        var filename = ReactDOM.findDOMNode(this.refs.filename).value.trim();
        if (!client) {
            return;
        }
        this.props.addOrder(client, filename);

        ReactDOM.findDOMNode(this.refs.client).value = "";
        ReactDOM.findDOMNode(this.refs.filename).value = "";
    },

    render: function () {
        return (
            <div className="container">
                <form className="form-order" method="post" onSubmit={this.handleSubmit}>
                    <h2 className="form-order-heading">提交订单</h2>
                    <label htmlFor="client" className="sr-only">Email address</label>
                    <input type="text" id="client" className="form-control" placeholder="客户" ref="client"/>

                    <label htmlFor="filename" className="sr-only">Password</label>
                    <input type="text" id="filename" className="form-control" placeholder="文件名" ref="filename"/>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">提交</button>
                </form>
            </div>
        )
    }
});

module.exports = OrderForm;