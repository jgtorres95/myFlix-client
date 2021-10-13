import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// create MovieView component
export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button className="movie-view-button" variant="dark">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button className="movie-view-button" variant="dark">Genre</Button>
        </Link>

        <Button className="movie-view-button" variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>

      </div >
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};