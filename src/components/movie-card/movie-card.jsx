import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import './movie-card.scss';

import { Link } from "react-router-dom";

// create MovieCard component
export class MovieCard extends React.Component {

  render() {
    const { movie, handleFavorite } = this.props;

    let movies = movie;
    return (
      <Card border="dark" bg="light" text="dark">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="movie-card-button" variant="dark">Open</Button>
          </Link>
          <Button className="movie-card-button" variant="dark" onClick={() => { handleFavorite(movies) }}>Add to Favs</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};