var userLat
var userLong
var host = 'https://api.darksky.net/forecast/e0477ed58041c8232d9f57dc2652536d/'
var proxy = 'https://cors-anywhere.herokuapp.com/'
var excluded = '?exclude=minutely,hourly,daily,alerts,flags'
var queryUrl
var queryme

var icons = new Skycons(),
  list = [
    'clear-day', 'clear-night', 'partly-cloudy-day',
    'partly-cloudy-night', 'cloudy', 'rain', 'sleet', 'snow', 'wind',
    'fog'
  ],
  i

$(document).ready(function () {
  doloc()

  function doloc () {
        // check if users browser supports geolocation api
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, showError, options)
    } else {
      alert("Couldn't quite get your location")
    }
  }

    // option (object) settings for getCurrentPosition
  var options = {
    enableHighAccuracy: false,
    timeout: Infinity,
    maximumAge: 0
  }

    // success callback
  function success (position) {
    userLat = position.coords.latitude
    userLong = position.coords.longitude
    makeQueryUrl(userLat, userLong)
  }
    // error handler
  function showError (positionError) {
    switch (positionError.code) {
      case positionError.PERMISION_DENIED:
        alert('User denied location request')
        break
      case positionError.POSITION_UNAVAILABLE:
        alert('Location information currently unavailable')
        break
      case positionError.TIMEOUT:
        alert('request timeout')
      case positionError.UNKOWN_ERROR:
        alert('unknown error')
    }
  }

  function makeQueryUrl (latitude, longitude) {
    queryUrl = proxy + host + latitude + ',' + longitude + excluded
    getWeather()
  }

  function getWeather () {
    $.getJSON(queryUrl, function (json) {
      queryme = json
      var queryResult = queryme.currently.icon
      setTheme(queryResult)
      console.log(queryme)
      setWeather()
    })
  }

  function setTheme (weather) {
    $('canvas').attr('id', weather)

    loadIcon()

    switch (weather) {
      case 'clear-day':
        icons.color = '#ffffff'
        $('body').addClass('clear-day')
        break
      case 'clear-night':
        icons.color = '#ffffff'
        $('body').addClass('clear-night')
        break
      case 'partly-cloudy-day':
        icons.color = '#BAE3F2'
        $('body').addClass('partly-cloudy-day')
        break
      case 'partly-cloudy-night':
        icons.color = '#B1BDBA'
        $('body').addClass('partly-cloudy-night')
        break
      case 'cloudy':
        icons.color = '#186885'
        $('body').addClass('cloudy')
        break
      case 'rain':
        icons.color = '#ffffff'
        $('body').addClass('rain')
        break
      case 'snow':
        icons.color = '#1F9FF0'
        $('body').addClass('snow')
        break
      case 'fog':
        icons.color = '#2B424F'
        $('body').addClass('fog')
        break
    }
  }

  function loadIcon () {
    for (i = list.length; i--;) { icons.set(list[i], list[i]) }
    icons.play()
  }

  function setWeather () {
    var result = queryme.currently
    $('#temperature').text(result.temperature)
    $('#summary').text(result.summary)
  }

  $('#converter').click(function () {
    debugger
    if ($('#unit').html() == '°F') {
      var temp = $('#temperature').text()
      var celsius = toCelsius(temp)
      $('#temperature').html(celsius)
      $('#unit').html('&degC')
      $('#converter').html('/&degF')
    } else {
      var temp = $('#temperature').text()
      var farenheit = toFarenheit(temp)
      $('#temperature').html(farenheit)
      $('#unit').html('&degF')
      $('#converter').html('/&degC')
    }
  })

  function toCelsius (farenheit) {
    return ((farenheit - 32) / 1.8).toFixed(2)
  }

  function toFarenheit (celsius) {
    return ((celsius * 1.8) + 32).toFixed(2)
  }
})
