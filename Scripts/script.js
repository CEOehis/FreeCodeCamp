// 'use strict'
$(document).ready(function () {
  $('#search-field').focus()
})

function makeUrl (input) {
  return host + urlQueryString + input
}

var host = 'https://en.wikipedia.org/'
var urlQueryString = 'w/api.php?action=query&callback=?&format=json&prop=info%7Cextracts&generator=search&exsentences=1&exlimit=10&exintro=1&gsrnamespace=&gsrlimit=10&gsrsearch='
$('#submit').click(function () {
  console.log('button clicked!')
  var userInput = $('#search-field').val()
  var queryUrl = makeUrl(userInput)
  var html = '<nav class="navbar navbar-default" role="navigation">'
  html += '<div class="container-fluid">'
  html += '<div class="navbar-header">'
  html += '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">'
  html += '<span class="sr-only">Toggle search-box</span> Mini Wiki</button>'
  html += '<a class="navbar-brand" href="index.html">'
  html += '<img class="img-responsive" width="30" height="30" src="./assets/miniWiki icon2.png" alt="brand-icon"></a></div>'
  html += '<div class="collapse navbar-collapse navbar-ex1-collapse">'
  html += '<ul class="nav navbar-nav"><li><a href="index.html">Home</a></li></ul>'
  html += '<ul class="nav navbar-nav navbar-right">'
  html += '<li><a target="_blank" href="https://en.wikipedia.org/wiki/Special:Random">Random Article</a></li>'
  html += '</ul>'
  html += '</div></div></nav>'
  html += '<div id="waiting" class="container"><p class="loading">Loading search results for <b>"' + userInput + '" </b><i class="fa fa-spinner fa-spin fa-pulse fa-fw"></i></p></div>'

  $('body').html(html)
  $.getJSON(queryUrl, function (json) {
    $('#waiting').html('<p class="loading">Showing search results for <b>"' + userInput + '" </b><i class="fa fa-check fa-fw"></i></p>')
    console.log('started working')
    var result = json.query.pages
    var body = '<div class="display container">'
    for (item in result) {
      body += '<div class="show">'
      body += '<h4>' + result[item].title + '</h4>'
      body += result[item].extract
      body += '<a target="_blank" href="' + host + '?curid='
      body += result[item].pageid + '">'
      body += '...Read more</a></div>'
    }
    body += '</div>'
    $('body').append(body)
    console.log('finished!')
  })
})
