const { Command } = require('discord.js-commando')

module.exports = class AcceptEnableCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'accept:set-channel',
      group: 'accept',
      memberName: 'set-channel',
      description: 'Sets the accept channel',
      clientPermissions: [
        'USE_EXTERNAL_EMOJIS',
        'MANAGE_ROLES',
        'MANAGE_MESSAGES'
      ],
      userPermissions: ['MANAGE_ROLES'],
      guildOnly: true,
      args: [
        {
          key: 'channel',
          type: 'text-channel',
          prompt: 'What channel would you like to use for accept?'
        }
      ],
      throttling: {
        usages: 3,
        duration: 15
      }
    })
  }

  run (message, { channel }) {
    const data = this.client.data.accept

    if (!data.has(message.guild.id)) {
      data.create(message.guild.id)
    }
    data.set(message.guild.id, 'channel', channel.id)
    message.channel.send(`***✅ Set the accept channel to ${channel}***`)
  }
}
