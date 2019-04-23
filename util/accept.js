exports.init = function init (client) {
  client.on('message', message => {
    if (!message.guild) return

    const data = client.data.accept.get(message.guild.id)
    if (!data || !data.enabled) return

    if (message.channel.id === data.channel) {
      message.delete()
      if (message.content === '/accept') {
        message.member.roles.add(data.role)
      } else {
        message.author.send(
          `Please don't send unrelated messages in ${message.channel}`
        )
      }
    }
  })
}
