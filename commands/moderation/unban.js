const Discord = require('discord.js');

module.exports = {
    name: "unban",
    aliases: ['ub'],
    meta: {
        category: 'Moderation',
        description: "Unban a user from the server",
        syntax: '`unban <userID|@user>`',
        extra: null,
        guildOnly: true
    },
    help: new Discord.MessageEmbed()
        .setTitle("Help -> Unban")
        .setDescription("Unbans a user from the server, allowing them to join again if they have an invite.")
        .addField("Syntax", "`unban <userID|@user>`"),
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}unban <userID|@user>\``);}

        if (!message.member.permissions.has("BAN_MEMBERS")) {return message.channel.send("You don't have permissions to do that!");}
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {return message.channel.send("I don't have permissions to unban members in your server.");}
        let user = client.users.cache.get(args[0]) || message.mentions.users.first() || args[0];

        return message.guild.members.unban(user.id || user)
            .then(async () => {
                return message.channel.send("I've unbanned that user!")    
                    .then(() => message.guild.channels.cache.get('830600344668602409').send(new Discord.MessageEmbed()
                        .setAuthor(message.member.displayName, message.author.avatarURL())
                        .setTitle("Member Unbanned!")
                        .setDescription(`<@${user.id || user}> was unbanned by ${message.author.username}!`)
                        .setColor('34eb86')
                        .setFooter("Kit", client.user.avatarURL())
                        .setTimestamp()
                ));
            })
            .catch((e) => {return message.channel.send("Something went wrong while trying to unban that user! If the problem persists, contact my devs.");});
    }
};