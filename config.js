const client = {};
client.token = process.env.token || "";
client.secrets = process.env.secret || "";
client.publicKey = process.env.publicKey || "";
client.user = {};
client.user.id = "998366267155173406";
client.mongo = {};
client.mongo.url = process.env.mongoUrl || "";
client.guild = "1088390786690846752";

module.exports = { client };