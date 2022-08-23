const sqlite3 = require('sqlite3').verbose(); //.verbose will throw more detailed error message when there's connection issue


var connection = new sqlite3.Database('./database_assignment.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the Easybuy database.');
});

module.exports = { connection };


//MY SQL 
/* var properties = {
  host: "yourdb.mysql.database.azure.com",
  port: 3306,
  user: "you@yourdb",
  password: "FinTechSG2022",
  database: "market",
};

var connection = mysql.createConnection(properties);



connection.connect((errors) => {
  if (errors) {
    console.log("Couldn't connect to the MySQL Server. Error: " + errors);
  } else {
    console.log("Connected to MySQL successfully!");
  }
});   

setInterval(() => {
  connection.query("select 1");
}, 60 * 1000); */