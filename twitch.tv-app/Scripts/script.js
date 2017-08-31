'use strict'
var regularStreamers = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']

var queryUrl
for (var i = 0; i < regularStreamers.length; i++) {
  queryUrl = 'https://api.twitch.tv/kraken/streams/' + regularStreamers[i]
  getUserInfo(queryUrl)
}

var display = document.getElementById('users')
var list = document.createElement('ul')

function getUserInfo (url) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.responseType = 'json'
  request.setRequestHeader('Client-ID', 'd990njzbdstbfrn941lh3eifqr3qpe')
  request.onload = handleResponse
  request.send()
}

function handleResponse () {
  parse(this.response)
}

function parse (jsonObj) {
  var obj
  var status
  var statusIcon
  if (jsonObj.hasOwnProperty('stream') && jsonObj.stream == null) {
    var url = jsonObj._links.channel
    getOfflineUser(url)
    return
  }

  if (jsonObj.hasOwnProperty('stream')) {
    obj = jsonObj.stream.channel
    status = 'online'
    statusIcon = 'fa fa-twitch'
  } else {
    obj = jsonObj
    status = 'offline'
    statusIcon = 'fa fa-exclamation'
  }

  var user = document.createElement('li')
  user.setAttribute('class', 'user-display ' + status)
  var userLink = document.createElement('a')
  userLink.setAttribute('href', obj.url)
  userLink.setAttribute('target', '_blank')
  var userImg = document.createElement('img')
  userImg.setAttribute('src', obj['logo'])
  if (obj['logo'] == null) userImg.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2Y1NWPLa7p_IksODWXYsKcdCQ_jUy5VUntvCdiUvFCpYxET1')
  var userSpan = document.createElement('span')
  userSpan.setAttribute('class', 'user')
  userSpan.textContent = obj['display_name']
  var userIcon = document.createElement('i')
  userIcon.setAttribute('class', statusIcon)

  userLink.appendChild(userImg)
  userLink.appendChild(userSpan)
  userLink.appendChild(userIcon)
  user.appendChild(userLink)
  list.appendChild(user)
  display.appendChild(list)
}

function getOfflineUser (url) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.responseType = 'json'
  request.setRequestHeader('Client-ID', 'd990njzbdstbfrn941lh3eifqr3qpe')
  request.onload = handleResponse
  request.send()
}
