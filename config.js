const client = {};
client.token = process.env.token || "";
client.secrets = process.env.secret || "";
client.publicKey = process.env.publicKey || "";
client.user = {};
client.user.id = "1170087529031159829";
client.mongo = {};
client.mongo.url = process.env.mongoUrl || "";
client.guild = "1163589188663394335";

module.exports = { client };