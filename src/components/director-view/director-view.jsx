import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './director-view.scss';

// create DirectorView component 
export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <h1>{director.Name}</h1>
        </Row>
        <Row>
          <p>{director.Bio}</p>
        </Row>
        <Row>
          <Button variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>
        </Row>
      </Container>
    )
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};