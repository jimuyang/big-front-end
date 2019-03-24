import React from 'react';
import ReactDOM from 'react-dom';

class HelloMessage extends React.Component {
    render() {
        return (
            <div>
                Hello {this.props.name}
            </div>
        );
    }
}

export default () => {
    ReactDOM.render(
        <HelloMessage name="Taylor" />,
        document.querySelector('#container')
    );
}