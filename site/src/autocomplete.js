import React from 'react';
import unidecode from 'unidecode';

class Autocomplete extends React.Component {
  renderList() {
    let list = [];
    let query = unidecode(this.props.query).toLowerCase();

    for (let i = 0; i < this.props.items.length; i++) {
      let item = this.props.items[i];

      let match = item.asciiName.indexOf(query);
      let begin = item.name.slice(0, match);
      let highlight = item.name.slice(match, match + query.length);
      let end = item.name.slice(match + query.length);

      let li = (
        <li
          className="suggestion"
          key={i}
          onClick={() => this.props.onClick(item.name)}
        >
          {begin}
          <span className="highlight">{highlight}</span>
          {end}
        </li>
      );

      list.push(li);
    }

    return list;
  }

  render() {
    if (this.props.items.length > 0) {
      return (
        <ul className="autocomplete-content suggestion-list">
          {this.renderList()}
        </ul>
      );
    }
    return <React.Fragment />;
  }
}

export default Autocomplete;
