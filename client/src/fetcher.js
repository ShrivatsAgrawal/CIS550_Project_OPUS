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

const getCompanyPeers = async (symbol) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/company/peers/${symbol}`, {
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

const getCompanies = async (companyName, numEmployeesLow, numEmployeesHigh, mktcapLow, mktcapHigh, sentiLow, sentiHigh, jobNum) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/company?companyName=${companyName}&numEmployeesLow=${numEmployeesLow}&numEmployeesHigh=${numEmployeesHigh}&mktcapLow=${mktcapLow}&mktcapHigh=${mktcapHigh}&sentiLow=${sentiLow}&sentiHigh=${sentiHigh}&jobNum=${jobNum}`, {
        method: 'GET',
    })
    return res.json()
}

const getJobs = async (companyName, numEmployeesLow, numEmployeesHigh, industry, sector, jobType, ratingLow, ratingHigh, jobTitle) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/jobs?companyName=${companyName}&numEmployeesLow=${numEmployeesLow}&numEmployeesHigh=${numEmployeesHigh}&industry=${industry}&sector=${sector}&jobType=${jobType}&ratingLow=${ratingLow}&ratingHigh=${ratingHigh}&jobTitle=${jobTitle}`, {
        method: 'GET',
    })
    return res.json()
}


export {
    getCompanyNews,
    getCompanyInfo,
    getCompanyPeers,
    getCompanyJobs,
    getCompanySentiment,
    getCompanies,
    getJobs
}
