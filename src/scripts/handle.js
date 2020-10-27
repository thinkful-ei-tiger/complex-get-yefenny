const apiKey = '3aWRz50NCLqBvFPFRZFwNZ57wD62MBkiAhnDJ1EV';
const url = 'https://developer.nps.gov/api/v1/parks';

function displayParks(response) {
  let newList = '';
  for (let i = 0; i < response.data.length; i++) {
    let shortResponse = response.data[i].addresses[0];
    let address = `${shortResponse.line1} <br> `;
    !shortResponse.line2 === ''
      ? (address += `${shortResponse.line2} <br>`)
      : '';
    !shortResponse.line3 === ''
      ? (address += `${shortResponse.line3} <br>`)
      : '';
    address += `${shortResponse.city},${shortResponse.stateCode}<br>
    ${shortResponse.postalCode}<br>
    ${shortResponse.type} `;
    newList += ` <li>
        <h3>${response.data[i].fullName}</h3>
        <p>${response.data[i].description}</p>
        <p>Address: ${address}</p>
        <a href=${response.data[i].url} target='_black'>Go to the website</a>
      </li>`;
  }
  console.log(newList);
  $('#js-result-list').html(newList);
  $('.js-results').removeClass('hidden');
}
function formatParams(params) {
  let newParams = [];
  for (let key in params) {
    newParams.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
  }
  return newParams.join('&');
}

function getParks(query, limit) {
  console.log('here');
  let params = {
    api_key: apiKey,
    stateCode: query,
    limit: limit
  };

  const newQuery = formatParams(params);

  const newUrl = url + '?' + newQuery;
  console.log(newUrl);
  fetch(newUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((jsonResponse) => displayParks(jsonResponse))
    .catch((err) => $('js-error-message').text(`Something went wrong: ${err}`));
}
function handleSubmit() {
  console.log('here');
  $('.js-form').on('submit', function (evt) {
    evt.preventDefault();
    let states = $('#stateCode').val();
    let limit = $('#limit').val();
    getParks(states, limit);
  });
}

export default { handleSubmit };
