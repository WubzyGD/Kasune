const Discord = require('discord.js');
const chalk = require('chalk');

const wait = require('../util/wait');

const UserData = require('../models/user');
const AR = require('../models/ar');

module.exports = async (client, message) => {
    if (message.author.bot) {return undefined;}
    if (message.channel.type !== 'text' && message.channel.type !== 'dm' && message.channel.type !== "news") { return undefined; }

	//if (message.channel.type == "text") {if (settings[message.guild.id]) {prefix = settings[message.guild.id].prefix;};};

    if (message.guild && !message.member.permissions.has("SEND_MESSAGES")) {return undefined;}
	
    let prefix = message.guild ? client.guildconfig.prefixes.has(message.guild.id) ? client.guildconfig.prefixes.get(message.guild.id) !== null ? client.guildconfig.prefixes.get(message.guild.id) : '-' : '-' : '-';

	let msg = message.content.toLowerCase();
	let mention = message.mentions.users.first();
    let args = msg.startsWith(prefix)
        ? message.content.slice(prefix.length).trim().split(/\s+/g)
        : msg.startsWith('<@!') 
            ? message.content.slice(4 + client.user.id.length).trim().split(/\s+/g)
            : message.content.slice(3 + client.user.id.length).trim().split(/\s+/g);
	let cmd = args.shift().toLowerCase().trim();

    if (message.content.includes("@everyone")) {return;}

	if ([`<@${client.user.id}>`, `<@!${client.user.id}>`].includes(msg)) {
	    return message.channel.send(new Discord.MessageEmbed()
        .setTitle(["Yep, that's me!", "^^ Hiya!", "Oh, hi there!", "Sure, what's up?", "How can I help?", "Kit Kasune here!"][Math.floor(Math.random() * 6)])
        .setDescription(`My prefix here is \`${prefix}\`. Use \`${prefix}help\` to see what commands you can use.`)
        .setColor('2c9cb0'));
    }

	if (mention && message.guild) {require('../util/mention')(message, msg, args, cmd, prefix, mention, client);}
    UserData.findOne({uid: message.author.id}).then(async (tu) => {
	if (tu && tu.statusmsg.length && tu.statusclearmode === 'auto') {
        tu.statusmsg = '';
        tu.statustype = '';
        tu.save();
        require('../util/siftstatuses')(client, message.author.id, true);
        message.reply('Welcome back! I cleared your status.').then(m => {m.delete({timeout: 5000});});
	}});

	if (message.guild && client.misc.cache.ar.has(message.guild.id) && client.misc.cache.ar.get(message.guild.id).includes(msg.trim()) && !(client.misc.cache.arIgnore.has(message.guild.id) && client.misc.cache.arIgnore.get(message.guild.id).includes(message.channel.id))) {
	    AR.findOne({gid: message.guild.id}).then(ar => {
	        if (ar && ar.triggers.length && ar.triggers.includes(msg.trim())) {return message.channel.send(ar.ars[ar.triggers.indexOf(msg.trim())]);}
	    });
	}

    if (message.channel.id === "827752961857028097") {
        if (!client.misc.bumpPing) {
            client.misc.bumpPing = setTimeout(() => {
                client.misc.bumpPing = null;
                message.channel.send([
                    `<@&880983649363836998>, here's your friendly neighborhood reminder to bump the server!`,
                    `<@&880983649363836998>, time to bump bitches!`,
                    `<@&880983649363836998>, it do be bump time`,
                    `<@&880983649363836998>, bump the heccin server`,
                    `<@&880983649363836998>, bump or death`,
                    `Bump the server <@&880983649363836998>!`,
                    `<@&880983649363836998> since I can't exactly bump, looks like you guys gotta do it.`,
                    `<@&880983649363836998>, boomp servor :3`
                ][Math.floor(Math.random() * 7)]);
            }, (1000 * 60 * 60 * 2));
        }
    }

 if (message.guild && message.channel.id === "827747781192056843") {return require('../util/newpartner.js')(message, client);}

    try {
        if (msg.startsWith(prefix) || msg.startsWith(`<@${client.user.id}>`) || msg.startsWith(`<@!${client.user.id}>`)) {
            let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

            if (command && command.name !== "blacklist") {
                if (message.guild && client.misc.cache.bl.guild.includes(message.guild.id)) {return message.channel.send("Your server has been blacklisted from using my commands! Shame, tsk tsk");}
                if (client.misc.cache.bl.user.includes(message.author.id)) {return message.channel.send("You've been blacklisted from using my commands! Now what'd ya do to deserve that??");}
            }

            if (!command) {let trigger; for (trigger of client.responses.triggers) {if (await trigger[1](message, msg, args, cmd, prefix, mention, client)) {await client.responses.commands.get(trigger[0]).execute(message, msg, args, cmd, prefix, mention, client); break;}} return;}
            message.channel.startTyping();
            await wait(800);
            message.channel.stopTyping();
            if (command.meta && command.meta.guildOnly && !message.guild) {return message.channel.send("You must be in a server to use this command!");}
            if (message.guild && message.channel.id === "827747781192056843") { return require('../util/newpartner.js')(message, client); }
            require('../util/oncommand')(message, msg, args, cmd, prefix, mention, client);
            //if (client.misc.loggers.cmds) {client.misc.loggers.cmds.send(`${chalk.gray("[CMDL]")} >> ${chalk.white("Command")} ${chalk.blue(command.name)} ${message.guild ? `|| ${chalk.blue("Guild ID: ")} ${chalk.blueBright(message.guild.id)}` : ''} || ${chalk.blue("User ID: ")} ${chalk.blueBright(message.author.id)}`);}
            return command.execute(message, msg, args, cmd, prefix, mention, client);
        }
        let trigger; for (trigger of client.responses.triggers) {if (await trigger[1](message, msg, args, cmd, prefix, mention, client)) {await client.responses.commands.get(trigger[0]).execute(message, msg, args, cmd, prefix, mention, client); break;}}
    } catch (e) {
        let date = new Date; date = date.toString().slice(date.toString().search(":") - 2, date.toString().search(":") + 6);
        console.error(`\n${chalk.red('[ERROR]')} >> ${chalk.yellow(`At [${date}] | In ${message.guild ? message.guild.name : `a DM with ${message.author.username}`}\n`)}`, e);
    }
};