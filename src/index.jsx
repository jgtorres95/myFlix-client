import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

//Find root of app
const container = document.getElementsByClassName('app-container')[0];

//Render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);