// create action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';

//create action creators
export function setMovies(value) {
  return { type: SET_MOVIES, value};
}

export function setFilter(value) {
  return { type: SET_FILTER, value}; 
}

export function setUser(value) {
  console.log('SET_USER action reached')
  console.log(value);
  return { type: SET_USER, value};
}