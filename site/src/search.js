import React from 'react';

import neighborhoods from './neighborhoods';
import Row from './row';

class Search extends React.Component {
  componentDidMount() {
    let elems = document.querySelectorAll('.autocomplete');

    let list = {};
    for (let n of Object.keys(neighborhoods)) {
      list[n] = null;
    }

    let options = {
      data: list,
      onAutocomplete: this.props.onAutocomplete,
      sortFunction: (a, b) => a.localeCompare(b),
    };

    // eslint-disable-next-line no-undef
    M.Autocomplete.init(elems, options);
  }

  render() {
    return (
      <Row>
        <h5 className="col s12 light">Digite seu bairro:</h5>
        <div className="input-field col l4 offset-l4 s8 offset-s2">
          <input
            type="text"
            className="autocomplete"
            value={this.props.query}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            autoFocus
          />
        </div>
      </Row>
    );
  }
}

export default Search;
