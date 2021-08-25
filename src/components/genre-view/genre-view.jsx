import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <h1>{genre.Name}</h1>
        </Row>
        <Row>
          <p>{genre.Description}</p>
        </Row>
        <Row>
          <Button variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>
        </Row>
      </Container>
    )
  }
}