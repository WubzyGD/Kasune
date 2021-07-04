const Discord = require("discord.js");

const Partners = require('../models/partner');

module.exports = async (message, client) => {
    let tp = await Partners.findOne({ gid: message.guild.id }) || new Partners({ gid: message.guild.id });
    if (!Object.keys(tp.partners).includes(message.author.id)) { tp.partners[message.author.id] = 0; }
    tp.partners[message.author.id] += 1;
    tp.total += 1;
    tp.markModified(`partners.${message.author.id}`);
    tp.save();
    return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`New Partner #${tp.total}!`)
        .setThumbnail(message.guild.iconURL({ size: 1024, dynamic: true }))
        .setDescription(`PM: ${message.member.displayName} || <@${message.member.id}>\nTheir partner count: ${tp.partners[message.author.id]}`)
        .setColor('52c7bb')
        .setFooter("Kasune", client.user.avatarURL())
        .setTimestamp()
    );
};