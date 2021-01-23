var { exec } = require('child_process');
module.exports.host = username , channel , url => {
if(!username) throw Error('Username not found')
else if(!channel) throw Error('Channel Not Found')
var socket = require('socket.io-client')( url ||'https://dev-talk.glitch.me/')

} 