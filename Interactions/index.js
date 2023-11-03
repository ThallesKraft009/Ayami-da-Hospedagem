const fs = require("fs");
const { DiscordRequest } = require("../utils.js");
const { InteractionType, InteractionResponseType } = require("discord-interactions");
const commands = []
ReadySlashCommand(require("../config.js").client)
//const { db_set_botlist } = require("../database.js");

module.exports = async (client, i, res, t) => {
  if (!t) return;

  async function Collector(func) {
    func(i, res);
  }

  if (i.type === InteractionType.APPLICATION_COMMAND) {
    commands[i.data.name].run(client, i, res, DiscordRequest, Collector);
  }

  //console.log(i.type)
/*
  if (i.type === 3) {

    //console.log(i.data)
   return res.send({
      type: 9,
      data: {
        title: 'BotList',
        custom_id: 'botlist-modal',
        components: [
          {
            type: 1,
            components: [
              {
                type: 4,
                style: 1,
                label: 'Qual o ID do bot?',
                custom_id: '1',
                placeholder: 'Ex: 123456789',
              },
            ],
          },
          {
            type: 1,
            components: [
              {
                type: 4,
                style: 2,
                label: 'Fale uma breve descrição',
                custom_id: '2',
                placeholder: 'Ex: É uma robô de moderação feita em javascript',
                required: true,
              },
            ],
          },{
            type: 1,
            components: [{
              type: 4,
              style: 1,
              label: "Qual o prefixo?",
              custom_id: "3",
              placeholder: "Ex: k! ou /"
            }]
          },
        ],
      },
    })
  }

  if (i.type === 5){
    //console.log(i.data)
    if (i.data.custom_id === "botlist-modal"){

      let x = i.data.components;
      //console.log(x)

      let info = {};
      info.id = x[0].components[0].value;
      info.description = x[1].components[0].value;
      info.prefix = x[2].components[0].value;

      //console.log(info)

      let avatarUrl = `https://cdn.discordapp.com/avatars/${info.id}/abcdef123456789.png`;

     /* db_set_botlist(`${info.id}`, {
        bot_id: info.id,
        bot_description: info.description,
        bot_prefix: info.prefix,
        join: false
      })

      let logEmbed = {
   title: "Log de Bot",
   color: 16711680, // Vermelho (em decimal)
   thumbnail: {
      url: avatarUrl
   },
    fields: [
      {
         name: "ID do Bot",
         value: info.id,
         inline: true
      },
      {
         name: "Descrição",
         value: info.description,
         inline: true
      },
      {
         name: "Prefixo",
         value: info.prefix,
         inline: true
      }
   ]
      }

      res.send({
        type: 4,
        data: {
          content: "Bot enviado!",
          flags: 1 << 6
        }
      })

      try {
        await DiscordRequest("channels/1152976924801515560/messages",{
          method: "POST",
          body: {
            content: "mention",
            embeds: [logEmbed],
            components: [{
              type: 1,
              components: [{
                type: 2,
                label: "Adicionar Bot",
                style: 5,
                url: `https://discord.com/api/oauth2/authorize?client_id=${info.id}&permissions=325056&scope=bot`
              }]
            }]
          }
        })
      } catch (wrr){
        console.log(wrr)
      }
  
    }
  }*/
};

async function ReadySlashCommand(client) {
  let local = "Commands";
  let tudo = [];
  const commandDataList = [];

  fs.readdirSync(`./${local}/`).forEach((dir) => {
    const files = fs.readdirSync(`./${local}/${dir}/`).filter((file) => file.endsWith('.js'));

    files.forEach((file) => {
      let command = require(`../${local}/${dir}/${file}`);

      if (command) {
        commands[command.data.name] = command;
        tudo.push(command.data);
        commandDataList.push(command.data);
      }
    });
  });

  // Exclua todos os comandos existentes
  await DeleteSlashCommand(client);

  // Registre todos os comandos novamente
  
  await RegisterSlashCommands(client, commandDataList);
}

async function DeleteSlashCommand(client) {
  const endpoint = `applications/${client.user.id}/guilds/${client.guild}/commands`;

  try {
    // Obtenha a lista de comandos existentes
    const response = await DiscordRequest(endpoint, { method: 'GET' });
    const existingCommands = await response.json();

    // Exclua cada comando individualmente
    for (const command of existingCommands) {
      await DiscordRequest(`applications/${client.user.id}/guilds/${client.guild}/commands/${command.id}`, {
        method: 'DELETE',
      });
    }
  } catch (error) {
    console.error('Erro ao excluir comandos:', error);
  }
}

async function RegisterSlashCommands(client, command_list) {
  const endpoint = `applications/${client.user.id}/guilds/${client.guild}/commands`;

  command_list.map(async(commands)=>{
  try {
    const response = await DiscordRequest(endpoint, {
      method: 'POST',
      body: commands,
    });

    if (response.status === 201) {
      console.log('Comandos registrados com sucesso.');
    } else {
      console.error('Erro ao registrar comandos. Resposta da API:', response.status, response.statusText);
    }
  } catch (err) {
    console.error('Erro ao registrar comandos:', err);
  }
      })
  }
  