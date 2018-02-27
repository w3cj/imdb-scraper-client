const main = document.querySelector('main');
const imdbID = window.location.search.match(/imdbID=(.*)/)[1];
const BASE_URL = 'https://imdb-scrpr.now.sh/';

function getMovie(imdbID) {
  return fetch(`${BASE_URL}movie/${imdbID}`)
    .then(res => res.json());
}

function showMovie(movie) {
  console.log(movie);
  const section = document.createElement('section');
  main.appendChild(section);

  const date = dateFns.parse(movie.datePublished);
  movie.datePublished = dateFns.format(date, 'MMMM Do YYYY');

  const properties = [{
    title: 'Rating',
    property: 'rating'
  }, {
    title: 'Run Time',
    property: 'runTime'
  }, {
    title: 'Released',
    property: 'datePublished'
  }, {
    title: 'Summary',
    property: 'summary'
  }, {
    title: 'Story Line',
    property: 'storyLine'
  }];

  const descriptionHTML = properties.reduce((html, property) => {
    html += `
      <dt class="col-sm-3">${property.title}</dt>
      <dd class="col-sm-9">${movie[property.property]}</dd>`;
    return html;
  }, '');

  section.outerHTML = `
    <section class="row">
      <h1 class="text-center">${movie.title}</h1>
      <div class="col-sm-12">
        <img src="${movie.poster}" class="img-fluid" />
      </div>
      <div class="col-sm-12">
        <dl class="row">
          ${descriptionHTML}
        </dl>
      </div>
    </section>
  `;
}

getMovie(imdbID)
  .then(showMovie);
