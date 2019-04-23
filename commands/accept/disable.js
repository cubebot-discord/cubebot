const { Command } = require('discord.js-commando')

module.exports = class AcceptEnableCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'accept:disable',
      group: 'accept',
      memberName: 'disable',
      description: 'Disables the command to accept rules',
      clientPermissions: ['USE_EXTERNAL_EMOJIS'],
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
    data.set(message.guild.id, 'enabled', false)
    message.channel.send('***✅ Disabled accept***')
  }
}
