$(document).ready(addFormEventHandler)


function addFormEventHandler (){
  $('form#song-form').submit(handleFormSubmit)
}

function handleFormSubmit (event){
  console.log(event)
  event.preventDefault()
  findAndRenderSongs()
}

function findAndRenderSongs(){
  const URL = 'https://api.spotify.com/v1/artists/'
  // find the user's search query and interpolate that into the URL
  let $input = $('input#query')
  let userInput = $input.val()
  let query = userInput.split(' ').join('+')
  $input.val('')
  // 1. Find what the user put in the input field and then append that into the url as so
  // 'https://api.spotify.com/v1/artists/{id}'
  // 1. Fire an XHR reqeust to the Spotify API

  $.ajax({
    url: `${URL}?q=${query}`,
    success: renderSongs
  })
}

function renderSongs (data){
  // 2. When the response comes back, append some lis to my ul for the user
  let songList = $('.js--song-list')
  songList.html('')

  function renderSongs ( song ) {
    let title = song.volumeInfo.title
    songList.append(`<li class='collection-item'>${title}</li>`)
  }

  data.items.forEach(renderSongs)
}
