import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter peoples dreams and steal their secrets from their subconscious.His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves.', ImagePath: 'https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/product_image_aspect_switcher_170w/public/product-images/csm-movie/inceptionmovie-newposter-big.jpg?itok=zn3rPAOq' },
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison for the murders of his wife and her lover and is sentenced to a tough prison. However, only Andy knows he didnt commit the crimes.While there, he forms a friendship with Red(Morgan Freeman), experiences brutality of prison life, adapts, helps the warden, etc., all in 19 years.', ImagePath: 'https://images-na.ssl-images-amazon.com/images/I/519NBNHX5BL._SY445_.jpg' },
        { _id: 3, Title: 'Gladiator', Description: 'Set in Roman times, the story of a once-powerful general forced to become a common gladiator. The emperors son is enraged when he is passed over as heir in favour of his fathers favourite general. He kills his father and arranges the murder of the generals family, and the general is sold into slavery to be trained as a gladiator - but his subsequent popularity in the arena threatens the throne.', ImagePath: 'https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/product_image_aspect_switcher_170w/public/product-images/csm-movie/gladiator-poster.jpg?itok=wJ_O8kje' },
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}
export default MainView; 