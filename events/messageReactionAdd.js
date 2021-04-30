const Discord = require("discord.js");
const GuildData = require('../models/guild');
const StarData = require('../models/starboard');

const channel = '827739558472056842';
const reactions = {
    '828444039450984448': {
        '♂️': '703508714635788338',
        '♀️': '703508726363193344',
        '⬇️': '703508758902341664',
        '↗️': '703508745715580958',
        '❌': '703508773242929192'
    },
    '828450544833396767': {
        '🎮': '827741721399787590',
        '🖌️': '827741412547100692',
        '⌨️': '827741241490800651',
        '📝': '828447192934121482',
        '📺': '828447230003249152'
    },
    '837395032591695883': {
        '1️⃣': '764168315492892692',
        '2️⃣': '764168783429894226',
        '3️⃣': '764168324371972116',
        '4️⃣': '764168372442103828',
        '5️⃣': '764168364187975700',
        '6️⃣': '764168779226808322',
        '7️⃣': '764168337231708162',
        '8️⃣': '764168332206276658',
        '9️⃣': '764168353648476201',
        '0️⃣': '764168345590693900'
    },
    '837398024678277220': {
        'NC_wave': '703506794726817792',
        'NC_Chika': '703506838485729330'
    },
    '837407739529265232': {
        '📑': '764171264385744906',
        '📌': '764171275814830110',
        '🤜': '764171245599064084',
        '⚡': '764171284748828713'
    }
};

module.exports = async (client, reaction, user) => {
    if (reaction.partial) {try {await reaction.fetch();} catch {return;}}

    if (reaction.emoji.name === "⭐") {
        if (!reaction.message.guild) {return;}
        let tg = await GuildData.findOne({gid: reaction.message.guild.id});
        if (!tg) {return;}
        if (tg.starchannel.length && tg.starsenabled && reaction.message.guild.channels.cache.has(tg.starchannel) && reaction.message.guild.channels.cache.get(tg.starchannel).permissionsFor(client.user.id).has('SEND_MESSAGES')) {
            if (reaction.message.channel.id === tg.starchannel) {return;}
            let sd = await StarData.findOne({gid: reaction.message.guild.id}) ? await StarData.findOne({gid: reaction.message.guild.id}) : new StarData({gid: reaction.message.guild.id});

            let starEmbed = new Discord.MessageEmbed()
                .setTitle('Starred Message!')
                .setDescription(`Sent by ${reaction.message.member.displayName} (<@${reaction.message.author.id}>) || Channel: ${reaction.message.channel.name} (<#${reaction.message.channel.id}>)\n[Jump to Message](${reaction.message.url})`)
                .setThumbnail(reaction.message.author.avatarURL({size: 2048}))
                .setColor('ebb931')
                .setFooter("Kit", client.user.avatarURL())
                .setTimestamp();
            if (reaction.message.content.length) {starEmbed.addField("Message", reaction.message.content);}
            starEmbed
                .addField("Stars", `:star: ${reaction.count}`, true)
                .addField(`${reaction.message.member.displayName.toLowerCase().endsWith('s') ? `${reaction.message.member.displayName}'` : `${reaction.message.member.displayName}'s`} StarBoard Count`, sd.starCount[reaction.message.author.id] ? sd.starCount[reaction.message.author.id] + 1 : 1, true);
            if (reaction.message.attachments.size) {starEmbed.setImage(reaction.message.attachments.first().url);}
            if (Object.keys(sd.stars).includes(reaction.message.id)) {
                let starMessage = await reaction.message.guild.channels.cache.get(tg.starchannel).messages.fetch(sd.stars[reaction.message.id]);
                if (starMessage) {await starMessage.edit(starEmbed);}
            } else {
                if (reaction.count < tg.starreq) {return;}
                let starEmbedMessage = await reaction.message.guild.channels.cache.get(tg.starchannel).send(starEmbed);
                sd.stars[reaction.message.id] = starEmbedMessage.id;
                sd.starCount[reaction.message.author.id] = sd.starCount[reaction.message.author.id] ? sd.starCount[reaction.message.author.id] + 1 : 1;
                sd.serverStarCount += 1;
                sd.save();
            }
        }
    }

    if (user.bot) {return;}

    if (reaction.message.channel.id === channel && Object.keys(reactions).includes(reaction.message.id)) {
        let rmsg = reactions[reaction.message.id];
        if (Object.keys(rmsg).includes(reaction.emoji.name)) {
            reaction.message.guild.members.cache.get(user.id).roles.add(rmsg[reaction.emoji.name]).catch(() => {}).then(() => {
                let r = reaction.message.guild.roles.cache.get(rmsg[reaction.emoji.name]);
                if (!client.misc.cache.rr[user.id]) {client.misc.cache.rr[user.id] = {add: [], rem: [], last: new Date()};}
                if (client.misc.cache.rr[user.id].rem.includes(r)) {client.misc.cache.rr[user.id].rem.splice(client.misc.cache.rr.rem.indexOf(r), 1);}
                client.misc.cache.rr[user.id].add.push(r);
                client.misc.cache.rr[user.id].last.setTime(Date.now());
            });
        }
    }
};