const { client } = require("./config.js");
const express = require('express');
const app = express();
const { VerifyDiscordRequest } = require('./utils.js');
const { InteractionType, InteractionResponseType, InteractionResponseFlags} = require('discord-interactions');

app.use(
  express.json({ 
    verify: VerifyDiscordRequest(client.publicKey)    })
);

app.post('/interactions', async function (req, res) {

  const { type, id, data } = req.body;

if (type === InteractionType.PING) {
    return res.send({ 
      type: InteractionResponseType.PONG
    });
  } else {

      require("./Interactions/index.js")(client, req.body, res, true);
  
  }
})

app.get("/", (req, res)=>{
  res.send(200)
})

app.listen(process.env.PORT, () => {
  require("./Interactions/index.js")("", "", "", false)
})