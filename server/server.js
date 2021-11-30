const express = require('express');
const mysql      = require('mysql');


const routes = require('./routes')
const config = require('./config.json')

const app = express();


//New App Route
app.get('/jobs',routes.all_jobs)
app.get('/company/news/:symbol', routes.company_news)
app.get('/company/sentiment/:symbol', routes.company_sentiment)
app.get('/company/jobs/:symbol', routes.company_jobs)
app.get('/search/company', routes.all_companies)
app.get('/company/peers', routes.company_peer_info)
app.get('/company/info', routes.company_info)




app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
