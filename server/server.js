const express = require('express');
const mysql      = require('mysql');


const routes = require('./routes')
const config = require('./config.json')

const app = express();


//New App Route
app.get('/jobs',routes.all_jobs)
// Route 1 - register as GET 
app.get('/hello', routes.hello)

app.get('/company_news', routes.company_news)
app.get('/company_sentiment', routes.company_sentiment)
app.get('/company_jobs', routes.company_jobs)
app.get('/company_all', routes.all_companies)
app.get('/company_peers', routes.company_peer_info)
app.get('/company_info', routes.company_info)


// Route 2 - register as GET 
app.get('/jersey/:choice', routes.jersey)






app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
