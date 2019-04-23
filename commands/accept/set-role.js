const { Command } = require('discord.js-commando')

module.exports = class AcceptEnableCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'accept:set-role',
      group: 'accept',
      memberName: 'set-role',
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
          key: 'role',
          type: 'role',
          prompt:
            'What role would you like to give to people who accept the rules?'
        }
      ],
      throttling: {
        usages: 3,
        duration: 15
      }
    })
  }

  run (message, { role }) {
    const data = this.client.data.accept

    if (!data.has(message.guild.id)) {
      data.create(message.guild.id)
    }
    data.set(message.guild.id, 'role', role.id)
    message.channel.send(`***✅ Set the members role to ${role}***`)
  }
}
