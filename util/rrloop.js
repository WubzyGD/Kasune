const Discord = require('discord.js');
const message = require('../events/message');

module.exports = client => {
    let cd = new Date().getTime();
    Object.keys(client.misc.cache.rr).forEach(member => {
        if (cd - client.misc.cache.rr[member].last.getTime() > 15000) {
            let ars; let rrs;
            if (Object.keys(client.misc.cache.rr[member].add).length) {
                ars = ''; let i; for (i = 0; i < client.misc.cache.rr[member].add.length; i++) {ars += `${client.misc.cache.rr[member].add[i].name}, `;}
            }
            if (Object.keys(client.misc.cache.rr[member].rem).length) {
                rrs = ''; let i; for (i = 0; i < client.misc.cache.rr[member].rem.length; i++) {rrs += `${client.misc.cache.rr[member].rem[i].name}, `;}
            }

            if (!rrs && !ars) {return;}
            
            let emb = new Discord.MessageEmbed()
            .setTitle("Reaction Roles")
            .setDescription(ars && rrs ? `${client.misc.cache.rr[member].add.length} roles added and ${client.misc.cache.rr[member].rem.length} roles removed.` : ars ? `${client.misc.cache.rr[member].add.length} roles added.` : `${client.misc.cache.rr[member].rem.length} roles removed.`)
            .setColor('2c9cb0')
            .setFooter('Kit', client.user.avatarURL())
            .setTimestamp();

            if (ars) {emb.addField("Added", ars.trim().slice(0, ars.length - 1));}
            if (rrs) {emb.addField("Removed", rrs.trim().slice(0, rrs.length - 1));}

            delete client.misc.cache.rr[member];
    
            return client.users.cache.get(member).send(emb).catch(() => {});
        }
    });
};