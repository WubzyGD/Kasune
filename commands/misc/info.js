const Discord = require("discord.js");
const moment = require('moment');
const os = require('os');

const UserData = require('../../models/user');

module.exports = {
    name: "info",
    aliases: ["i", "botinfo", "bot"],
    help: "There's not really anything to help with here! Just use `{{p}}info` to learn more about me!",
    meta: {
        category: 'Misc',
        description: "Get info about me, my creators, and my status.",
        syntax: '`info`',
        extra: null
    },
    async execute(message, msg, args, cmd, prefix, mention, client) {
        let botData = await require('../../models/bot').findOne({finder: 'lel'});
        let user = await UserData.findOne({uid: message.author.id});

        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor("About Me!", client.users.cache.get(client.developers[Math.floor(Math.random() * client.developers.length)]).avatarURL())
            .setThumbnail(client.user.avatarURL({size: 1024}))
            .setDescription(`My name is Kit, and I'm the mascot for our café. I'm a kitsune, and I'm not the most sociable guy around, but I love coffee and music and I love working here!\n\nI am created by WubzyGD#8766 and Brys#0001, the server owners - in JavaScript/Discord.js!\n\nI help moderate the server, manage all kinds of things like the self roles and staff team, and I'm the Neptune Mascot!`)
            .addField("Neptune Café", "The Café is an amazing place for you to gather and socialize in a warm and cozy community, talk about anime and coffee, and meet new people! We have events like Kahoots and anime nights and regular music VCs.")
            .addField("Restarts", botData.restarts, true)
            .addField("Commands Executed", `${botData.commands}${user ? `\nYou: **${user.commands}** | **${Math.floor((user.commands / botData.commands) * 100)}%**` : ''}`, true)
            .addField("Last Restart", moment(botData.lastRestart).fromNow(), true)
            .addField("Mem", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\` heap of \`${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}MB\` allocated. | **${Math.floor((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100)}%**\nTotal RAM: \`${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}GB\` | Free RAM: \`${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)}GB\``, true)
            .setColor("2c9cb0")
            .setFooter("Kit")
            .setTimestamp());
    }
};