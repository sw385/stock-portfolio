const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql://localhost/stock-portfolio"
});

client.connect();

module.exports = client;
