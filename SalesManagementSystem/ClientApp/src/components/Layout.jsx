import React, { Component } from 'react';
// import { Container } from 'reactstrap';

import { Container } from 'semantic-ui-react';
import NavMenuBar from './NavMenuBar';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenuBar />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
