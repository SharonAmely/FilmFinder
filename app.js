// Function to display the filtered movies in the browser
const addMoviesToDom = (movies, word) => {
    const movieList = document.getElementById('movies-list');
    const moviePosters = movies.map(movie => movie.Poster);
    const imdbID = movies.map(movie => movie.imdbID);
   
   while (movieList.firstChild) {
     movieList.removeChild(movieList.lastChild);
     }
   for (i = 0; i < moviePosters.length && imdbID.length; i++) {
     const movieListItem = document.createElement('li');
     const movieLink = document.createElement('a');
     const movieImage = document.createElement('img');
     movieImage.src = moviePosters[i];
     movieList.appendChild(movieListItem);
     movieListItem.appendChild(movieLink);
     movieLink.setAttribute('href',`https://www.imdb.com/title/${imdbID[i]}`);
     movieLink.appendChild(movieImage);
   }
   if (movies.length !==  0) {
     return movieList;
   } else {
       movieList.innerHTML = `<h4>Helaas, we hebben geen match gevonden met "${word}", probeer iets anders :)<h4>`;
   }
 }
 
 // Function to filter all movies released from 2014
 const filterLatestMovie = movies => {
     const newMovies = movies.filter(movie => movie.Year >= 2014)
     addMoviesToDom(newMovies);
 }
 
 // Function to filter on specific genre/word
 const filterMovies = (movies, word) => { 
     movies = movies.filter(o => Object.keys(o).some(k => o[k].toLowerCase().includes(word.toLowerCase())));
     addMoviesToDom(movies, word);
 }
 
 // Adding the filter function to every individual radio button
 const handleOnChangeEvent = movies => event => {
     let wordInMovieTitle = event.target.value;
        switch (wordInMovieTitle) {
        case ('nieuwste'):
            filterLatestMovie(movies);
            break;
         case ('avengers'):
             filterMovies(movies, wordInMovieTitle);
             break;
         case ('x-men'):
             filterMovies(movies, wordInMovieTitle);
             break;
         case ('princess'):
             filterMovies(movies, wordInMovieTitle);
             break;
         case ('batman'):
             filterMovies(movies, wordInMovieTitle);
             break;
    }
 }
 
 const handleSearch = movies => event => {
     event.preventDefault();
     let searchInput = document.querySelector('#search-input');
     filterMovies(movies, searchInput.value);
 }
 
 // Pushing through al the filter buttons en adding an event
 const filterButtons = document.getElementsByName('filter-button');
 for(i = 0; i < filterButtons.length; i++) {
     filterButtons[i].addEventListener('change', handleOnChangeEvent(movies));
 }
 // Adding event to the search field
 const searchButton = document.querySelector('#search-form');
 searchButton.addEventListener('submit', handleSearch(movies));
 
 