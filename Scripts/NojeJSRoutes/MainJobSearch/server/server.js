const express = require('express');
const mysql      = require('mysql');


const routes = require('./routes')
const config = require('./config.json')

const app = express();


//New App Route
app.get('/jobs',routes.all_jobs)


app.get('/company_news/:symbol', routes.company_news)
app.get('/company_sentiment/:symbol', routes.company_sentiment)
app.get('/company_jobs/:symbol', routes.company_jobs)







app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
