import React from 'react';

import Autocomplete from './autocomplete';
import Row from './row';

class Search extends React.Component {
  render() {
    return (
      <Row>
        <h5 className="col s12 light">Digite seu bairro:</h5>
        <div className="input-field col l4 offset-l4 s8 offset-s2">
          <input
            type="text"
            value={this.props.query}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            autoFocus
          />
          <Autocomplete
            items={this.props.items}
            query={this.props.query}
            onClick={this.props.onClick}
          />
        </div>
      </Row>
    );
  }
}

export default Search;
