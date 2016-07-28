var React = require('react');
var ReactDOM = require('react-dom');

var OrderForm =React.createClass({

    handleSubmit : function(e){
        e.preventDefault();
        var client = ReactDOM.findDOMNode(this.refs.client).value.trim();
        var filename = ReactDOM.findDOMNode(this.refs.filename).value.trim();
        if(!client){
            return;
        }
        this.props.addOrder(client,filename);

        ReactDOM.findDOMNode(this.refs.client).value = "";
        ReactDOM.findDOMNode(this.refs.filename).value = "";
    },

    render : function(){
        return (
            <div className="row">
                <form className="col s12" method="post" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="client" type="text" ref="client" name="client" className="validate"/>
                            <label htmlFor="client">客户</label>
                        </div>

                        <div className="input-field col s12">
                            <input id="filename" type="text" ref="filename" name="filename" className="validate"/>
                            <label htmlFor="filename">文件名</label>
                        </div>

                        <button className="btn waves-effect waves-light" type="submit">Submit
                            <i className="mdi-content-send right"></i>
                        </button>
                    </div>
                </form>
            </div>
        )
    }
});

module.exports = OrderForm;