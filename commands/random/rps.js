const { Command } = require('discord.js-commando')

module.exports = class WarnCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'rps',
      group: 'random',
      memberName: 'rps',
      description: 'Play rock-paper-scissors with the bot',
      args: [
        {
          key: 'thing',
          type: 'rps',
          prompt: 'What do you pick?'
        }
      ],
      examples: ['rps rock']
    })
  }

  run (message, { thing }) {
    const choiceNumber = Math.floor(Math.random() * 3)
    const choiceString = ['rock', 'paper', 'scissors'][choiceNumber]

    const wins = {
      rock: {
        paper: false,
        scissors: true
      },
      paper: {
        scissors: false,
        rock: true
      },
      scissors: {
        rock: false,
        paper: true
      }
    }
    if (choiceString === thing) {
      message.reply(`You chose ${thing}. I chose ${choiceString}. It's a tie!`)
    } else if (wins[thing][choiceString]) {
      message.reply(`You chose ${thing}. I chose ${choiceString}. You won!`)
    } else {
      message.reply(`You chose ${thing}. I chose ${choiceString}. I won!`)
    }
  }
}
