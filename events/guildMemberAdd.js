const Discord = require('discord.js');

module.exports = async (client, member) => {
    if (member.guild.id === client.misc.neptune) {
        //server
        client.guilds.cache.get(client.misc.neptune).channels.cache.get('827760233479929886').send(
            new Discord.MessageEmbed()
                .setAuthor(member.displayName, client.users.cache.get(member.id).avatarURL())
                .setTitle("Hiya!")
                .setDescription(`Everyone welcome <@${member.id}> to the **Neptune Café**! Our **${member.guild.members.cache.size}${`${member.guild.members.cache.size}`.endsWith('1') ? 'st' : `${member.guild.members.cache.size}`.endsWith('2') ? 'nd' : `${member.guild.members.cache.size}`.endsWith('3') ? 'rd' : 'th'}** member!`)
                .setColor('1ac34d')
        );

        //member
        client.users.fetch(member.id).then(user => {
            user.send(new Discord.MessageEmbed()
                .setTitle("Hey there!")
                .setDescription("I'm Kit, the Neptune Café mascot, and I just wanted to welcome you to our server.")
                .addField("To-do", "Now that you're here:\n-Check out our <#752326903150673953>,\n-Grab some roles in <#827739558472056842>,\n-Order yourself a drink,\n\n**-And come say hi in our <#827692054641508382>!** You can always grab a seat next to someone you don't know!\n\nIf you have a free moment, don't be afraid to <#827752961857028097> either :3")
                .setColor('2c9cb0')
                .setThumbnail(client.guilds.cache.get(client.misc.neptune).iconURL({size: 2048}))
                .setFooter("Kit", client.user.avatarURL())
            );
        }).catch(() => {});
    }

    if (member.guild.id === client.misc.night) {
        //server
        client.guilds.cache.get(client.misc.night).channels.cache.get('867134094987231266').send(
            new Discord.MessageEmbed()
                .setAuthor(member.displayName, client.users.cache.get(member.id).avatarURL())
                .setTitle("Hiya!")
                .setDescription(`Everyone welcome <@${member.id}> to the **Night Lounge**! Our **${member.guild.members.cache.size}${`${member.guild.members.cache.size}`.endsWith('1') ? 'st' : `${member.guild.members.cache.size}`.endsWith('2') ? 'nd' : `${member.guild.members.cache.size}`.endsWith('3') ? 'rd' : 'th'}** member!`)
                .setColor('4777b9')
        );

        //member
        client.users.fetch(member.id).then(user => {
            user.send(new Discord.MessageEmbed()
                .setTitle("Hey there!")
                .setDescription("I'm Kit, the Night Lounge mascot, and I just wanted to welcome you to our server.")
                .addField("To-do", "Now that you're here:\n-Grab some self roles in <#867134094987231265>. **You'll need to go here to get NSFW access!**\n-Say hi in <#867134094987231268>\n-And make sure you see our **rules** in <#867134094987231262>")
                .setColor('b12989')
                .setThumbnail(client.guilds.cache.get(client.misc.night).iconURL({size: 2048}))
                .setFooter("Kit", client.user.avatarURL())
            );
        }).catch(() => {});
    }

    client.user.setActivity(`over ${client.guilds.cache.get(client.misc.neptune).members.cache.size} members!`, {type: "WATCHING"});
};