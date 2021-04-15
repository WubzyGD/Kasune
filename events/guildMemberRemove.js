const Discord = require('discord.js');
const moment = require('moment');
require('moment-precise-range-plugin');
const chalk = require('chalk');

const Mute = require('../models/mute');
    
module.exports = async (client, member) => {
    client.guilds.cache.get(client.misc.neptune).channels.cache.get('827757664788152350').send(new Discord.MessageEmbed()
        .setTitle("Member Left!")
        .setColor('ff0000')
        .setDescription(`**${member.displayName}** has left the server.\n\nThe member's highest role was ${member.roles.highest ? `<@&${member.roles.highest.id}>` : '<No Roles>'} and they were in the server for ${moment.preciseDiff(moment(member.joinedAt), moment())}.`)
        .addField("Members", `We now have **${member.guild.members.cache.size}** members.`)
        .setThumbnail(client.guilds.cache.get(client.misc.neptune).iconURL({size: 1024}))
    );

    let cm = Mute.findOne({uid: member.id});
    if (cm) {
        member.guild.members.ban(member.id)
        .then(() => message.guild.channels.cache.get('830600344668602409').send("<@&828000073203974166>", new Discord.MessageEmbed()
            .setAuthor(member.displayName, client.users.cache.get(member.id).avatarURL())
            .setTitle("Mute Evasion Detected!")
            .setDescription(`<@${member.id}> has evaded their mute, and I've automatically banned them!`)
            .addField("Original Mod", `<@${cm.id}>`)
            .setColor('c77dff')
            .setFooter("Kit", client.user.avatarURL())
            .setTimestamp()
        )).catch(e => {
            console.error(`\n${chalk.red('[ERROR]')} >> ${chalk.yellow(`At [${date}] | Occurred while trying to ban a member for mute evasion`)}`, e);
            message.guild.channels.cache.get('830600344668602409').send("<@&828000073203974166> **Failed automatic mute evasion ban!**", new Discord.MessageEmbed()
                .setAuthor(member.displayName, client.users.cache.get(member.id).avatarURL())
                .setTitle("Mute Evasion Detected!")
                .setDescription(`<@${member.id}> has evaded their mute, but I was not able to automatically ban them! Their user ID is \`${member.id}\`.`)
                .addField("Original Mod", `<@${cm.id}>`)
                .setColor('c77dff')
                .setFooter("Kit", client.user.avatarURL())
                .setTimestamp()
            );
        });
    }
};