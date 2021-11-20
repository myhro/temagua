import React from 'react';

import Row from './row';

class Status extends React.Component {
  getStatus() {
    if (this.props.size == 'big') {
      return <h2 className={this.props.color}>{this.props.message}</h2>;
    }
    return <h4 className={this.props.color}>{this.props.message}</h4>;
  }

  render() {
    return <Row>{this.getStatus()}</Row>;
  }
}

export default Status;
