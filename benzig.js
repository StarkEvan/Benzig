var Discord = require('discord.io');

var logger = require('winston');
var auth = require('./auth.json');


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';


// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});


bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');

bot.setPresence ({
            game:{
                name: Drawing,
                type: '1', // can be '2' for 'listening to' prefix // can be '3' for 'watching' prefix
                url: 'URL TO TWITCH IF STREAMING'
            }
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it needs to execute a command
    // for this script it will listen for messages that will start with `!`
    if (message.substring(0, 1) == 'b!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        switch(cmd) {
            // b!ping
            case 'ping':
                bot.sendMessage({ to: channelID, message: 'Pong!' });
            break;
            default:
                bot.sendMessage({ to: channelID, message: 'Unknown command.' });
        }
    }
})
