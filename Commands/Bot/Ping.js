const { InteractionType, InteractionResponseType } = require('discord-interactions');

module.exports = {
  data: {
    name: "ping",
    description: "Veja minha latência",
    type: 1
  },
  run: async(client, i, res, DiscordRequest, Collector) => {
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: '🏓 Pong!',
      },
    });
  }
}