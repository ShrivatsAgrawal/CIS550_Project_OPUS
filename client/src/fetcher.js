import config from './config.json'

const getCompanyNews = async (page, pagesize, symbol) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/company/news/${symbol}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getCompanyInfo = async (symbol) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/company/info/${symbol}`, {
        method: 'GET',
    })
    return res.json()
}

const getCompanyJobs = async (page, pagesize, symbol) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/company/jobs/${symbol}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    
    return res.json()
}

const getCompanySentiment = async (symbol) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/company/sentiment/${symbol}`, {
        method: 'GET',
    })
    return res.json()
}

/*
const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/company/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPlayers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

*/


export {
    getCompanyNews,
    getCompanyInfo,
    getCompanyJobs,
    getCompanySentiment
}
