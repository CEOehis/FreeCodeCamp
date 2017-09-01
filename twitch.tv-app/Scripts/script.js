'use strict'
let regularStreamers = ['medrybw', 'ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']

let queryUrl
for (var i = 0; i < regularStreamers.length; i++) {
  queryUrl = 'https://api.twitch.tv/kraken/streams/' + regularStreamers[i]
  getUserInfo(queryUrl)
}

var display = document.getElementById('users')

function getUserInfo (url) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.responseType = 'json'
  request.setRequestHeader('Client-ID', 'd990njzbdstbfrn941lh3eifqr3qpe')
  request.onload = handleResponse
  request.send()
}

function handleResponse () {
  console.log(this.response)
  parse(this.response)
}

function parse (jsonObj) {
  var obj
  var status
  var stream
  var statusIcon
  if (jsonObj.hasOwnProperty('stream') && jsonObj.stream == null) {
    var url = jsonObj._links.channel
    getUserInfo(url)
    return
  }

  if (jsonObj.hasOwnProperty('stream')) {
    obj = jsonObj.stream.channel
    status = 'online'
    stream = ':  ' + jsonObj.stream.channel.status
    statusIcon = 'fa fa-twitch'
  } else {
    obj = jsonObj
    status = 'offline'
    stream = ' '
    statusIcon = 'fa fa-exclamation'
  }

  var list = document.createElement('ul')

  var user = document.createElement('li')
  user.setAttribute('class', 'user-display ' + status)
  var userLink = document.createElement('a')
  userLink.setAttribute('href', obj.url)
  userLink.setAttribute('target', '_blank')
  var userImg = document.createElement('img')
  userImg.setAttribute('src', obj['logo'])
  if (obj['logo'] == null) userImg.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2Y1NWPLa7p_IksODWXYsKcdCQ_jUy5VUntvCdiUvFCpYxET1')
  var userSpanContainer = document.createElement('span')
  userSpanContainer.setAttribute('class', 'user')
  var userNameSpan = document.createElement('span')
  userNameSpan.textContent = obj['display_name']
  var userStreamSpan = document.createElement('span')
  userStreamSpan.setAttribute('class', 'stream')
  userStreamSpan.textContent = stream
  var userIcon = document.createElement('i')
  userIcon.setAttribute('class', statusIcon)

  userLink.appendChild(userImg)
  userLink.appendChild(userSpanContainer)
  userSpanContainer.appendChild(userNameSpan)
  userSpanContainer.appendChild(userStreamSpan)
  userLink.appendChild(userIcon)
  user.appendChild(userLink)
  list.appendChild(user)
  display.appendChild(list)
}

function showOnlineUsers () {
  showUsers()
  var offline = document.getElementsByClassName('offline')
  for (let i = 0; i < offline.length; i++) {
    offline[i].style.display = 'none'
  }
}
function showOfflineUsers () {
  showUsers()
  var online = document.getElementsByClassName('online')
  for (let i = 0; i < online.length; i++) {
    online[i].style.display = 'none'
  }
}
function showUsers () {
  var all = document.getElementById('users').querySelectorAll('li')
  for (let i = 0; i < all.length; i++) {
    all[i].style.display = 'flex'
  }
}
