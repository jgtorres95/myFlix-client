import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { connect } from 'react-redux';
import axios from 'axios';

import { Link } from "react-router-dom";
import './profile-view.scss';

const mapStateToProps = state => {
  const { movies, user } = state;
  return { movies, user };
};

// create ProfileView component
export class ProfileView extends React.Component {

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
    const { user, movies, handleRemove } = this.props;

    const favoritesList = movies.filter(m => {
      if (user.FavoriteMovies) {
        return user.FavoriteMovies.includes(m._id);
      }
      return [];
    });

    return (
      <Container>
        <Row>
          <Card border="dark" bg="light" text="dark" className="profile-card">
            <Card.Body>
              <Card.Title>Username: {user.Username}</Card.Title>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>Birthday: {user.Birthday}</Card.Text>
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
                    <Button className="profile-view-button" variant="dark" onClick={() => { handleRemove(movie) }}>Remove</Button>
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

export default connect(mapStateToProps)(ProfileView);

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.array.isRequired,
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired
}; 