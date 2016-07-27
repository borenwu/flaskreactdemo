var React = require('react');
var ReactDOM = require('react-dom');
var Todo = require('./components/Todo');
var Page1 = require('./components/Page1')
var Page2 = require('./components/Page2')
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var browserHistory = require('react-router').browserHistory


//ReactDOM.render(<Todo/>, document.getElementById("todo-container"));

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Todo}/>
        <Route path="page1" component={Page1}/>
        <Route path="page2" component={Page2}/>
    </Router>
), document.getElementById('todo-container'))