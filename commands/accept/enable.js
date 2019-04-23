const { Command } = require('discord.js-commando')

module.exports = class AcceptEnableCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'accept:enable',
      group: 'accept',
      memberName: 'enable',
      description: 'Enables the command to accept rules',
      clientPermissions: ['USE_EXTERNAL_EMOJIS', 'MANAGE_ROLES'],
      userPermissions: ['MANAGE_ROLES'],
      guildOnly: true,
      throttling: {
        usages: 3,
        duration: 15
      }
    })
  }

  run (message) {
    const data = this.client.data.accept

    if (!data.has(message.guild.id)) {
      data.create(message.guild.id)
    }
    if (!data.get(message.guild.id).channel) {
      message.channel.send(
        '***<:cubebotFail:431429659499036682> You must set a channel first, using the `accept:set-channel` command***'
      )
    } else if (!data.get(message.guild.id).role) {
      message.channel.send(
        '***<:cubebotFail:431429659499036682> You must set a role first, using the `accept:set-role` command***'
      )
    } else {
      data.set(message.guild.id, 'enabled', true)
      message.channel.send('***✅ Enabled accept***')
    }
  }
}
