const channel = ['827739558472056842', '867134094987231265'];
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
    '870833756628484136': {
        'KN_wave': '867134094320205881',
        'KN_chika': '867134094320205880'
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
    if (user.bot) {return;}

    if (channel.includes(reaction.message.channel.id) && Object.keys(reactions).includes(reaction.message.id)) {
        let rmsg = reactions[reaction.message.id];
        if (Object.keys(rmsg).includes(reaction.emoji.name)) {
            reaction.message.guild.members.cache.get(user.id).roles.remove(rmsg[reaction.emoji.name]).catch((e) => {console.error(e)}).then(() => {
                let r = reaction.message.guild.roles.cache.get(rmsg[reaction.emoji.name]);
                if (!client.misc.cache.rr[user.id]) {client.misc.cache.rr[user.id] = {add: [], rem: [], last: new Date()};}
                if (client.misc.cache.rr[user.id].add.includes(r)) {client.misc.cache.rr[user.id].add.splice(client.misc.cache.rr.add.indexOf(r), 1);}
                client.misc.cache.rr[user.id].rem.push(r);
                client.misc.cache.rr[user.id].last.setTime(Date.now());
            });
        }
    }

    if (reaction.message.guild && client.misc.queue[reaction.message.guild.id]
    && reaction.message.guild.members.cache.get(user.id).voice.channel
    && reaction.message.guild.members.cache.get(user.id).voice.channel.id === client.misc.queue[reaction.message.guild.id].channel
    && reaction.message.id === client.misc.queue[reaction.message.guild.id].controller.id
    && reaction.emoji.name === '⏯️') {
        await client.misc.queue[reaction.message.guild.id].player.pause(false);
        require('../util/updatecontroller')(reaction.message, client);
    }
};