const { ArgumentType } = require('discord.js-commando')

module.exports = class RPSCommandType extends ArgumentType {
  constructor (client) {
    super(client, 'rps')
  }

  validate (value) {
    switch (value.toLowerCase()) {
      case 'rock':
      case 'paper':
      case 'scissors':
        return true
      default:
        return 'Please pick rock, paper, or scissors'
    }
  }

  parse (value) {
    return value.toLowerCase()
  }
}
