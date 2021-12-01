const express = require('express');
const mysql      = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');


const app = express();


app.use(cors({
    origin: '*'
}));



//New App Route
app.get('/jobs',routes.all_jobs)
app.get('/company/news/:symbol', routes.company_news)
app.get('/company/sentiment/:symbol', routes.company_sentiment)
app.get('/company/jobs/:symbol', routes.company_jobs)
app.get('/search/company', routes.all_companies)
app.get('/company/peers/:symbol', routes.company_peer_info)
app.get('/company/info/:symbol', routes.company_info)




app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;

//Test