const Discord = require('discord.js');
const moment = require('moment');
require('moment-precise-range-plugin');
    
module.exports = async (client, member) => {
    client.guilds.cache.get(client.misc.neptune).channels.cache.get('827757664788152350').send(new Discord.MessageEmbed()
        .setTitle("Member Left!")
        .setColor('ff0000')
        .setDescription(`**${member.displayName}** has left the server.\n\nThe member's highest role was ${member.roles.highest ? `<@&${member.roles.highest.id}>` : '<No Roles>'} and they were in the server for ${moment.preciseDiff(moment(member.joinedAt), moment())}.`)
        .addField("Members", `We now have **${member.guild.members.cache.size}** members.`)
        .setThumbnail(client.guilds.cache.get(client.misc.neptune).iconURL({size: 1024}))
    );
};