'use strict';

var mountNode = document.getElementById('component-mount');

var HelloMessage = React.createClass({
	render: function() {
		return <h1>Hello {this.props.message}</h1>;
	}
});

ReactDOM.render(<HelloMessage message="World" />, mountNode);
