const { Command } = require('discord.js-commando')
const fs = require('fs')
const path = require('path')

module.exports = class WarnCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'accept:enable',
      group: 'accept',
      memberName: 'enable',
      description: 'Enables the command to accept rules',
      clientPermissions: ['USE_EXTERNAL_EMOJIS'],
      guildOnly: true
    })
  }

  run (message) {
    let data = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'accept.json'), {
        encoding: 'utf-8'
      })
    )
    if (!data[message.guild.id]) {
      data[message.guild.id] = {
        enabled: false,
        channel: null,
        role: null
      }
    }
    if (!data[message.guild.id].channel) {
      message.channel.send(
        '***<:fail:431429659499036682> You must set a channel first, using the `accept:set-channel` command***'
      )
    } else if (!data[message.guild.id].role) {
      message.channel.send(
        '***<:fail:431429659499036682> You must set a role first, using the `accept:set-role` command***'
      )
    } else {
      data[message.guild.id].enabled = true
      fs.writeFile(path.join(__dirname, '..', '..', 'data', 'accept.json'), JSON.stringify(data))
      message.channel.send('***✅ Enabled accept***')
    }
  }
}
