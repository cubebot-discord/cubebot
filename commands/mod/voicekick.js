const { Command } = require('discord.js-commando')

module.exports = class WarnCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'voicekick',
      group: 'mod',
      memberName: 'voicekick',
      description: 'Removes a user from a voice channel',
      userPermissions: ['MOVE_MEMBERS'],
      clientPermissions: [
        'MOVE_MEMBERS',
        'MANAGE_CHANNELS',
        'USE_EXTERNAL_EMOJIS'
      ],
      guildOnly: true,
      args: [
        {
          key: 'user',
          type: 'member',
          prompt: 'What user would you like to kick?'
        }
      ],
      examples: ['voicekick MegaNoob123'],
      throttling: {
        usages: 10,
        duration: 15
      }
    })
  }

  async run (message, { user }) {
    if (!user.voiceChannel) {
      return message.channel.send(
        "***<:fail:431429659499036682> That user isn't in a voice channel***"
      )
    }
    const channel = await message.guild.channels.create('Temporary [CubeBot]', {
      type: 'voice',
      reason: `Voice kick of ${user.user.tag}`
    })
    await user.setVoiceChannel(channel)
    await channel.delete()
    message.channel.send(`***✅ ${user.user.tag} has been voice kicked!***`)
  }
}
