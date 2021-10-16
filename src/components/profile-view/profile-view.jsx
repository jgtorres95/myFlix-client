import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import axios from 'axios';

import { Link } from "react-router-dom";
import './profile-view.scss';

// create ProfileView component
export class ProfileView extends React.Component {

  // handle delete request for newly removed favorite
  handleRemove(movie) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    let url = `https://cf-myflix-app.herokuapp.com/users/${username}/movies/${movie._id}`;
    axios.delete(url,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        localStorage.clear();
        window.open(`/`, '_self');
        alert('Removed from favorites');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // handle delete request for deregistered user
  handleDeregister() {
    const token = localStorage.getItem("token");
    let url = 'https://cf-myflix-app.herokuapp.com/users/' + localStorage.getItem('user');
    axios.delete(url,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        localStorage.clear();
        alert('Profile successfully deleted');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { user, movies } = this.props;
    const favoriteMovies = localStorage.getItem('favoriteMovies');
    const favoritesList = movies.filter(m => {
      return favoriteMovies.includes(m._id);
    });

    return (
      <Container>
        <Row>
          <Card border="dark" bg="light" text="dark" className="profile-card">
            <Card.Body>
              <Card.Title>Username: {localStorage.getItem('user')}</Card.Title>
              <Card.Text>Email: {localStorage.getItem('email')}</Card.Text>
              <Card.Text>Birthday: {localStorage.getItem('birthday')}</Card.Text>
              <Card.Text>Favorite Movies: {localStorage.getItem('favoriteMovies')}</Card.Text>
            </Card.Body>
            <ul>
              <Link to={`/update/${user}`}>
                <Button className="profile-view-button" variant="dark">Edit</Button>
              </Link>
              <Button className="profile-view-button" variant="dark" onClick={() => { this.handleDeregister() }}>Delete Profile</Button>
            </ul>
          </Card>
        </Row>
        <Row>
          {favoritesList.map((movie) => {
            return (
              <Col md={4} key={movie._id}>
                <div key={movie._id}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Img variant="top" src={movie.ImagePath} />
                    </Card.Body>
                    <Button className="profile-view-button" variant="dark" onClick={() => { this.handleRemove(movie) }}>Remove</Button>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

ProfileView.PropTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.array.isRequired,
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired
};