var io = require('socket.io-client');
const chalk = require('chalk').constructor({ enabled: true, level: 3 });;
// Change the port If you want I am assuming you are in localhost
var socket = io("127.0.0.1");

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 

var id = "";
var buffer = "";


function chat(){
	rl.question(chalk.magenta("» "), (answer) => {
		buffer = `${chalk.cyan(id)} : ${chalk.bgCyan(answer)}`;
		socket.emit("message", buffer);
		chat();
	});
}

socket.on('connect', () => {

	rl.question(`What's your name? `, (answer) => {
			socket.emit("message", `👤  : ${chalk.green(answer)} has joined the chat`);
			id = answer;
			chat();

	});

	socket.on('msg', function(data){
		if(buffer!=data){
			console.log("\n" + data);
			chat();
		}
	});
	
})