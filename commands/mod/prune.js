const { Command } = require('discord.js-commando')

module.exports = class WarnCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'prune',
      group: 'mod',
      memberName: 'prune',
      description: 'Removes a certain number of messages',
      clientPermissions: ['MANAGE_MESSAGES'],
      userPermissions: ['MANAGE_MESSAGES'],
      guildOnly: true,
      args: [
        {
          key: 'messages',
          type: 'integer',
          min: 1,
          max: 100,
          prompt: 'How many messages would you like to delete?'
        }
      ],
      throttling: {
        usages: 10,
        duration: 15
      }
    })
  }

  async run (message, { messages }) {
    await message.delete().catch()
    message.channel.bulkDelete(messages, true).then(messages => {
      message.channel
        .send(`***✅ Deleted ${messages.size} messages***`)
        .then(msg => {
          setTimeout(() => msg.delete(), 3e3)
        })
    })
  }
}
