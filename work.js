var readline = require('readline'),
socket = require('socket.io-client')('https://dev-talk.glitch.me/'),//server
username = process.argv[2],
channel = process.argv[3],
chalk = require('chalk'),
rl = readline.createInterface(process.stdin, process.stdout);
socket.on('connect', () => {
    console.log(`username: ${chalk.green(username)} , Channel: ${chalk.red(channel)}`);
    console.log(chalk.red('=== start chatting ==='))
    socket.emit('join', { username: username, channel: channel });
    prompt()
})
socket.on('message', ({ user, msg, channel }) => function(user, msg, channel = this.channel) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    switch (user) {
      case 'Info':
        console.log(`(${chalk.yellow(user)}): ${chalk.yellow(msg)} (${chalk.yellow('channel')}: ${chalk.red(channel)})`);
   break;
      default:
        console.log(chalk.green(msg));
        prompt();
    }
rl.prompt(true);
}(user, msg, channel));

function prompt() {
    rl.question(`${chalk.cyan(username)}: `, (input) => {
        if(input== 'clear') console.clear() ,prompt()
        else if(input.length==0) prompt()
        else if(input=='stop') console.log('Please confirm by adding -c')
        else socket.emit('message', { user: username, msg: input });
     
    })
}