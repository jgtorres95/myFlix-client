import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// import action creators
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';

// component import statements
import MoviesList from '../movies-list/movies-list';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../update-view/update-view';
import { NavBarView } from '../navbar-view/navbar-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

//create MainView component
class MainView extends React.Component {

  constructor() {
    super();
    // Initialize state
    this.state = {
      selectedMovie: null,
      regStatus: false
    };
  }

  componentDidMount() {
    let user = localStorage.getItem('user');
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(user);
    }
    this.getMovies(accessToken);
  }

  // Update state of selectedMovie upon user clicking a movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // Update user state in store upon successful login
  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData);
    //this.setState({
    //user: authData.user.Username
    //user: authData.user

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('birthday', authData.user.Birthday);
    localStorage.setItem('password', authData.user.Password);
    localStorage.setItem('email', authData.user.Email);
    localStorage.setItem('favoriteMovies', authData.user.FavoriteMovies);


    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser(null);
    /*this.setState({
      user: null
    }); */
  }

  getMovies(token) {
    axios.get('https://cf-myflix-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state in the store
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    // destructure props
    const { movies, user } = this.props;
    return (
      <Router>
        <NavBarView user={user} />

        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />
          <Route path="/profile" render={() => {
            if (!user) return <Redirect to="/" />
            return <Col md={8}>
              <ProfileView user={user} movies={movies} />
            </Col>
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (!user) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/users/:username" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <ProfileView user={user} movies={movies} />
            </Col>
          }} />
          <Route path="/update/:username" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <UpdateView user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}

// extract movies and user state from store as props
let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

// connect MainView to store
export default connect(mapStateToProps, { setMovies, setUser })(MainView); 