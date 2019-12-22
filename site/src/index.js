import React from 'react';
import ReactDOM from 'react-dom';

import { hasWater, waterStatus } from './backend';
import Header from './header';
import neighborhoods from './neighborhoods';
import Row from './row';
import Search from './search';
import Status from './status';

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      message: '',
      query: '',
      size: '',
    };

    this.handleAutocomplete = this.handleAutocomplete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  async handleAutocomplete(value) {
    let color = '';
    let message = '';
    let size = 'big';

    this.loading();
    let region = neighborhoods[value];
    let status = await hasWater(region);
    switch (status) {
      case waterStatus.AVAILABLE:
        color = 'green-text';
        message = 'Sim';
        break;
      case waterStatus.UNAVAILABLE:
        color = 'red-text';
        message = 'Não';
        break;
      case waterStatus.OUTDATED:
        color = 'orange-text';
        message = 'Informações não disponíveis';
        size = 'small';
        break;
      default:
        color = 'red-text';
        message = 'Erro ao verificar disponibilidade';
        size = 'small';
    }

    this.setState({color, message, size});
  }

  handleChange(event) {
    this.setState({
      query: event.target.value,
    });
  }

  handleFocus(event) {
    this.setState({
      message: '',
      query: '',
    });
  }

  loading() {
    this.setState({
      color: 'blue-text',
      message: 'Carregando...',
      size: 'small',
    });
  }

  render() {
    return (
      <div className="container section">
        <Header />
        <Search
          query={this.state.query}
          onAutocomplete={this.handleAutocomplete}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
        />
        <Status
          color={this.state.color}
          message={this.state.message}
          size={this.state.size}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
