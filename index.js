const API_KEY = "AIzaSyDI42crpw0CwUoeBLe03GcImIbLiudl4y0";
const ENDPOINT = "https://www.googleapis.com/youtube/v3/search"

function getYoutubeData(searchTerm, callback) {
  const query = {
    type: "video",
    q: searchTerm,
    maxResults: 27,
    part: "snippet",
    key: API_KEY,
  };
  $.getJSON(ENDPOINT, query, callback);
}

function watchSubmit() {
  $("form").submit(function(e) {
    e.preventDefault();
    let queryTarget = $(e.currentTarget).find('#search');
    let query = queryTarget.val();
    queryTarget.val("");
    getYoutubeData(query, renderAllResults);
  });
}

function renderResult(result) {
    //(JSON.stringify(result))
  return (`<div><a href="https://www.youtube.com/watch?v=${result.id.videoId}"" target="_blank" class= "thumbnail"><img src="${result.snippet.thumbnails.medium.url}"></a></div>`);
}
function renderAllResults(data) {
  $(".js-result").html(data.items.map(renderResult));  
  console.log (data);
}



$(watchSubmit);