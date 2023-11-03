const { InteractionType, InteractionResponseType } = require('discord-interactions');

const fetch = require("node-fetch")
module.exports = {
  data: {
    name: "stop",
    description: "Desligue a Ayami",
    type: 1
  },
  run: async(client, i, res, DiscordRequest, Collector) => {

const options = {
  method: 'POST',
  headers: {
    Authorization: `${process.env.api}`
  }
};

fetch(`https://api.squarecloud.app/v2/apps/${process.env.id_key}/stop`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

    
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'A Ayami está desligado... aguarde',
      },
    });
  }
}