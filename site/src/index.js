import React from 'react';
import ReactDOM from 'react-dom';

import { hasWater, waterStatus } from './backend';
import Header from './header';
import Neighborhoods from './neighborhoods';
import Search from './search';
import Status from './status';

import '../node_modules/materialize-css/dist/css/materialize.min.css';

import './css/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.neighborhoods = new Neighborhoods();
    this.state = {
      autocomplete: [],
      color: '',
      message: '',
      query: '',
      size: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleChange(event) {
    let query = event.target.value;
    let autocomplete = this.neighborhoods.filter(query);
    this.setState({ autocomplete, query });
  }

  async handleClick(query) {
    let color = '';
    let message = '';
    let size = 'big';

    this.setState({ autocomplete: [], query });
    this.loading();

    let region = this.neighborhoods.region(query);
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

    this.setState({ color, message, size });
  }

  handleFocus() {
    this.setState({
      autocomplete: [],
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
          items={this.state.autocomplete}
          query={this.state.query}
          onChange={this.handleChange}
          onClick={this.handleClick}
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

ReactDOM.render(<App />, document.getElementById('root'));
