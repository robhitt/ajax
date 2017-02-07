$(document).ready(addFormEventHandler)


function addFormEventHandler (){
  $('form#album-form').submit(handleFormSubmit)
}

function handleFormSubmit (event){
  console.log(event)
  event.preventDefault()
  findAndRenderAlbums()
}

function findAndRenderAlbums(){
  const BEGURL = 'https://api.spotify.com/v1/search?q=artist:'
  const ENDURL = '&type=album'

  let $input = $('input#query')
  let userInput = $input.val()
  let query = userInput.split(' ').join('+')
  $input.val('')
  var renderSomething = renderAlbums.bind(null, query)
  // debugger;

  $.ajax({
    url: BEGURL + query + ENDURL,

    success: renderSomething // success passes into data below function
  })
}

function renderAlbums (query, data) {

  let albumList = $('ul.js--album-list')
  let artistName = $('div#js--artist-name')

  albumList.html('')
  artistName.html('')
  let temp_artist_name = capitalize(query.split('+').join(' '))
  artistName.prepend(`${temp_artist_name}`)

  function renderAlbum ( album ) {

    let albumName
    let albumLink
    let albumImage

    if (query.split('+').join(' ').toLowerCase() == album.artists[0].name.toLowerCase()) {

      albumName = album.name
      albumLink = album.external_urls.spotify
      albumImage = album.images[0].url
      albumEmbed = album.uri



      albumList.append(`<li class='collection-item'>
      <a href="${albumLink}" target="_blank"><h4>${albumName}</h4></a>
      <br>
      <a href="${albumLink}" target="_blank"><img src="${albumImage}" width="600" height="600">
      <br>
      <iframe src="https://embed.spotify.com/?uri=${albumEmbed}" width="600" height="380" frameborder="0" allowtransparency="true"></iframe>

      </li>`)
    }




  }

  data.albums.items.forEach(renderAlbum)

}

function capitalize (sentence) {
  var words = sentence.split(" ")
  var newSentence = []
  words.forEach(function(element){
    newSentence.push(element[0].toUpperCase() + element.slice(1))
  });
  return newSentence.join(" ")
}


// to add album art to name
// data.albums.items[1].images[0].url
