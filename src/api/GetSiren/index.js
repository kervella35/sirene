const { Client } = require('pg');

const ConnectionString = "host:pg-testazure.postgres.database.azure.com, port=5432, dbname=sirene, user=sa@pg-testazure, password=admin@PGSQL, sslmode=require"
const config = {
    host:"pg-testazure.postgres.database.azure.com",
    port:5432,
    database:"sirene",
    user:"sa@pg-testazure",
    password:"admin@PGSQL",
    sslmode:"require"
}

module.exports = async function (context, req) {

  const siren = (req.query.siren || (req.body && req.body.siren));

  const client = new Client(config);

  await client.connectAsync();

  const query = 'SELECT * FROM sirene WHERE siren = \''+siren+'\'';

  await client.queryAsync(query)
    .then( (res,err) =>
     {
        //console.log('err:'+JSON.stringify(err));
        //console.log('result:'+JSON.stringify(res.rows[0]));
        console.log('rows: '+res.rows.length);
		var js = [];

        res.rows.forEach( row =>
        {
			var o = {};
			o["denomination"] = row.denomination;
			o["denominationUsuelle"] = row.denominationusuelle1 + row.denominationusuelle2;
			js.push(o);
        });

    		//console.log(JSON.stringify(js));
        client.end();

        context.res = {
          status: 200, // Defaults to 200
          body: JSON.stringify(js)
        };
      });


  /*
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, // Defaults to 200
        body: responseMessage
    };
  */
 }
