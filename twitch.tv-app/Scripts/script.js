'use strict'
var regularStreamers = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']

var queryUrl
for (var i = 0; i < regularStreamers.length; i++) {
  queryUrl = 'https://api.twitch.tv/kraken/channels/' + regularStreamers[i]
  getUserInfo(queryUrl)
}

function getUserInfo (url) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.setRequestHeader('Client-ID', 'd990njzbdstbfrn941lh3eifqr3qpe')
  request.onload = handleResponse
  request.send()
}

function handleResponse () {
  console.log(this.response)
  var resultObj = this.response
}
