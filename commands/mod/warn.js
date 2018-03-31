const { Command } = require('discord.js-commando')

module.exports = class WarnCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'warn',
      group: 'mod',
      memberName: 'warn',
      description: 'Warns a user',
      userPermissions: ['MANAGE_GUILD'],
      guildOnly: true,
      args: [
        {
          key: 'user',
          type: 'user',
          prompt: 'What user would you warn?'
        },
        {
          key: 'reason',
          type: 'string',
          default: 1,
          prompt: 'What reason would you like to provide?'
        }
      ],
      examples: [
        'warn @ev3commander',
        'warn @MegaNoob123 no bot commands in general'
      ],
      throttling: {
        usages: 10,
        duration: 15
      }
    })
  }

  run (message, { user, reason }) {
    user.send(
      `You have been warned in ${message.guild.name} ${
        reason !== 1 ? `with reason: ${reason}` : '[no reason provided]'
      }`
    )
    message.channel.send(`***✅ ${user.tag} has been warned!***`)
  }
}
