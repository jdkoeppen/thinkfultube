const API_KEY = 'AIzaSyDI42crpw0CwUoeBLe03GcImIbLiudl4y0'
const ENDPOINT = 'https://www.googleapis.com/youtube/v3/search'
var searchedTerm
var nextPage
var prevPage

function getYoutubeData (searchTerm, pageToken, callback) {
  const query = {
    type: 'video',
    q: searchTerm,
    maxResults: 9,
    part: 'snippet',
    key: API_KEY,
    pageToken: pageToken
  }
  searchedTerm = searchTerm
  console.log(searchedTerm)
  $.getJSON(ENDPOINT, query, callback)
}

function watchSubmit () {
  $('form').submit(function (e) {
    e.preventDefault()
    let queryTarget = $(e.currentTarget).find('#search')
    let query = queryTarget.val()
    queryTarget.val('')
    getYoutubeData(query, undefined, renderAllResults)
    $('.results').css('visibility', 'visible')
  })
}

// comment

function watchPageNav () {
  $('.js-result').on('click', '#nextPage', function (e) {
    getYoutubeData(searchedTerm, nextPage, renderAllResults)
  })

  $('.js-result').on('click', '#prevPage', function (e) {
    getYoutubeData(searchedTerm, prevPage, renderAllResults)
  })
}

function renderPageNav (data) {
  nextPage = data.nextPageToken
  prevPage = data.prevPageToken
  let startTag = `<div class='pageNav'><form><fieldset>`
  let endTag = `</fieldset></form></div>`
  if (prevPage) {
    startTag += `<button type='button' id='prevPage' value='Prev'>Prev</button>`
  }
  if (nextPage) {
    startTag += `<button type='button' id='nextPage' value='Next'>Next</button>`
  }
  return startTag + endTag
}

function renderResult (result) {
  return (`<div class='result'><a href='https://www.youtube.com/watch?v=${result.id.videoId}' target='_blank' class= 'thumbnail'><img src='${result.snippet.thumbnails.medium.url}'></a><p class='caption'>${result.snippet.title}</p></div>`)
}

function renderAllResults (data) {
  $('.js-result')
    .html(data.items.map(renderResult))
    .append(renderPageNav(data))

  console.log(data)
}
$(watchSubmit)
$(watchPageNav)
