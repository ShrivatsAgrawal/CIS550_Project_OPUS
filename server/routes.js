const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

// *********************************************
//               OPUS PROJECT ROUTES
//**********************************************





// *********************************************
//         Main Job Search Page Route
//**********************************************
async function all_jobs(req, res) {



    //sample URL = http://localhost:8080/jobs?industry=tech&jobTitle=data&jobType=intern&numEmployeesLow=100
    //sample url 2 http://localhost:8080/jobs?industry=%&jobTitle=Data&jobType=intern&numEmployeesLow=10000&ratingLow=3.5
    const industry = req.query.industry ? req.query.industry : '%'
    const sector = req.query.sector ? req.query.sector : '%'
    const symbol = req.query.symbol ? req.query.symbol : '%'
    const cmpName = req.query.companyName ? req.query.companyName : '%'
    const jobType = req.query.jobType ? req.query.jobType : '%'
    const ratingLow = req.query.ratingLow ? req.query.ratingLow : 0
    const ratingHigh = req.query.ratingHigh ? req.query.ratingHigh : 5
    const numEmployeesLow = req.query.numEmployeesLow ? req.query.numEmployeesLow : 0
    const numEmployeesHigh = req.query.numEmployeesHigh ? req.query.numEmployeesHigh : 8000000000
    const jobTitle = req.query.jobTitle ? req.query.jobTitle : '%'

    const query_job = `WITH TT as (
        SELECT *
        FROM CompanyInformation CI
        JOIN IndeedJobs I ON I.companySymbol = CI.symbol
        WHERE CI.industry LIKE '%${industry}%' AND CI.sector LIKE '%${sector}%' AND
        CI.companyName LIKE '%${cmpName}%' AND I.jobType LIKE '%${jobType}%' AND
        (I.companyRating BETWEEN ${ratingLow} AND ${ratingHigh})
        AND (CI.fullTimeEmployees BETWEEN ${numEmployeesLow} AND ${numEmployeesHigh})
        AND I.jobTitle LIKE '%${jobTitle}%'
        ORDER BY CI.companyName
        )
        SELECT * FROM TT LIMIT 50;`

    connection.query(query_job, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
            console.log(req.query)
            console.log(query_job)

        }
    });


}

async function company_sentiment(req, res) {
    if (req.params.symbol) {
        var company = req.params.symbol
        connection.query(`WITH T1 AS (SELECT DISTINCT peerID as ID
            FROM Peers
            WHERE symbol = '${company}' or peerID = '${company}'),
            T2 AS (SELECT C.companyName, C.symbol, T1.ID
            FROM CompanyInformation C JOIN T1 ON C.symbol = T1.ID),
            T3 AS (SELECT S.sentiment, T1.ID
            FROM CompanySentiments S JOIN T1 ON S.symbol = T1.ID),
            T4 AS (SELECT 'Average of peers' AS companyName, 'AVG' AS symbol, AVG(S.sentiment) as sentiment
            FROM CompanySentiments S JOIN T1 ON S.symbol = T1.ID
            WHERE T1.ID != '${company}')
            SELECT * FROM T4
            UNION ALL
            SELECT T2.companyName, T2.symbol, T3.sentiment
            FROM T2 JOIN T3 ON T2.ID = T3.ID;`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({results: results});
            }
        });
    } else {
        res.json("no company");
    }
}

async function company_jobs(req, res) {
    var company = req.params.symbol?req.params.symbol : '%';
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page;
        const pagesize = req.query.pagesize ? req.query.pagesize : 10;
        const queryJob=`WITH Temp AS (
            WITH T1 AS (SELECT DISTINCT peerID
            FROM Peers
            WHERE symbol LIKE '%${company}%' OR peerID LIKE '%${company}%')
            SELECT ROW_NUMBER() OVER (ORDER BY postingDate) AS RowNum, *
            FROM IndeedJobs IJ JOIN T1 ON IJ.companySymbol = T1.peerID
            ORDER BY postingDate DESC)
            SELECT companySymbol, 
                   searchCompany,
                   jobType,
                   jobCountry,
                   searchLink,
                   jobTitle,
                   jobLink,
                   jobCompany,
                   companyLink,
                   companyRating,
                   jobLocation,
                   shortDescription,
                   postingDate,
                   salary
            FROM Temp
            WHERE RowNum <= ${page} * ${pagesize} && RowNum > ${pagesize} * (${page} - 1)
            ORDER BY PostingDate DESC`

        const query2=`SELECT * FROM Peers LIMIT 5;`
        connection.query(query2, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({results: results})
            }
        });
    } else {
        connection.query(`WITH T1 AS (SELECT DISTINCT peerID
            FROM Peers
            WHERE symbol LIKE '%${company}%' OR peerID LIKE '%${company}%')
            SELECT *
            FROM IndeedJobs IJ JOIN T1 ON IJ.companySymbol = T1.peerID
            ORDER BY postingDate DESC
            LIMIT 10;`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({results: results})
            }
        });
    }
}

async function company_news(req, res) {
    var company = req.params.symbol? req.params.symbol: '%';
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page;
        const pagesize = req.query.pagesize ? req.query.pagesize : 10;
        connection.query(`WITH Temp AS (
            WITH T1 AS (SELECT DISTINCT peerID
            FROM Peers
            WHERE symbol LIKE '%${company}%' or peerID LIKE '%${company}%')
            SELECT ROW_NUMBER() OVER (ORDER BY publishedDate) AS RowNum, *
            FROM CompanyNews CN JOIN T1 ON CN.symbol = T1.peerID
            ORDER BY publishedDate DESC)
            SELECT symbol, 
                   publishedDate,
                   title,
                   image,
                   site,
                   text,
                   url
            FROM Temp
            WHERE RowNum <= ${page} * ${pagesize} && RowNum > ${pagesize} * (${page} - 1)
            ORDER BY PostingDate DESC`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({results: results})
            }
        });
    } else {
        console.log("secondd")
        connection.query(`WITH T1 AS (SELECT DISTINCT peerID
            FROM Peers
            WHERE symbol LIKE '%${company}%' or peerID LIKE '%${company}%')
        SELECT *
        FROM CompanyNews CN JOIN T1 ON CN.symbol = T1.peerID
        ORDER BY publishedDate DESC 
        LIMIT 10;`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
             res.json({results: results})
        }
    });
    }
}
// ********************************************
//            SEARCH Page Route
// ********************************************
async function all_companies(req, res) {
    //sample URL = http://localhost:8080//company_all?cmpName=AAPL&numEmployeesLow=10&numEmployeesHigh=100000&mktcapLow=0&sentiLow=0&sentiHigh=1&jobNum=4
    //sample url 2 http://localhost:8080/jobs?industry=%&jobTitle=Data&jobType=intern&numEmployeesLow=10000&ratingLow=3.5
    const page= req.query.page
    const pagesize=req.query.pagesize ? req.query.pagesize : 10
    const offset= (page-1)*pagesize
    const cmpName = req.query.companyName ? req.query.companyName : '%'
    const numEmployeesLow = req.query.numEmployeesLow ? req.query.numEmployeesLow : 0
    const numEmployeesHigh = req.query.numEmployeesHigh ? req.query.numEmployeesHigh : 8000000000
    const mktcapLow = req.query.mktcapLow ? req.query.mktcapLow : 0
    const mktcapHigh = req.query.mktcapHigh ? req.query.mktcapHigh : 10000000000
    const sentiLow = req.query.sentiLow ? req.query.sentiLow : 0
    const sentiHigh = req.query.sentiHigh ? req.query.sentiHigh : 1
    const jobNum = req.query.jobNum ? req.query.jobNum : 5
    
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        
        connection.query(`WITH tmp1 AS
        (SELECT symbol,companyName
        FROM CompanyInformation
        WHERE companyName LIKE '${cmpName}' and
        fullTimeEmployees BETWEEN ${numEmployeesLow} AND ${numEmployeesHigh}
        AND mktCap BETWEEN ${mktcapLow} AND ${mktcapHigh}),
        tmp2 AS (SELECT s.symbol, tmp1.companyName
        FROM CompanySentiments s
        JOIN tmp1
        ON tmp1.symbol= s.symbol
        WHERE sentiment BETWEEN ${sentiLow} AND ${sentiHigh})
        SELECT *, COUNT(jobLink) as JobCount
        FROM IndeedJobs i
        JOIN tmp2
        ON tmp2.symbol=i.companySymbol
        GROUP BY i.companySymbol
        HAVING COUNT(jobLink)> ${jobNum}
        LIMIT ${pagesize} OFFSET ${offset};`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
   
    } else {
        
        connection.query(`WITH tmp1 AS
        (SELECT symbol,companyName
        FROM CompanyInformation
        WHERE companyName LIKE '${cmpName}' and
        fullTimeEmployees BETWEEN ${numEmployeesLow} AND ${numEmployeesHigh}
        AND mktCap BETWEEN ${mktcapLow} AND ${mktcapHigh}),
        tmp2 AS (SELECT s.symbol, tmp1.companyName
        FROM CompanySentiments s
        JOIN tmp1
        ON tmp1.symbol= s.symbol
        WHERE sentiment BETWEEN ${sentiLow} AND ${sentiHigh})
        SELECT *, COUNT(jobLink) as JobCount
        FROM IndeedJobs i
        JOIN tmp2
        ON tmp2.symbol=i.companySymbol
        GROUP BY i.companySymbol
        HAVING COUNT(jobLink)> ${jobNum}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }

}

// ********************************************
//            Company Info Page Route
// ********************************************
//sample URL : http://127.0.0.1:8080/company_info?symbol=aapl
async function company_info(req, res) {
    var company = req.params.symbol? req.params.symbol : '%';
    connection.query(`SELECT *
    FROM CompanyInformation
    WHERE symbol LIKE '%${company}%';` ,function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// ********************************************
//            Company Peer Info Page Route
// ********************************************
async function company_peer_info(req, res) {
    var company = req.params.symbol;
    const page= req.query.page
    const pagesize=req.query.pagesize ? req.query.pagesize : 10
    const offset= (page-1)*pagesize
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec! 
        // TODO: query and return results here:
        connection.query(`with t as (select peerID from Peers where symbol like '%${company}%')
        select companyName, peerID 
        from CompanyInformation ci JOIN t on ci.symbol=t.peerID LIMIT ${pagesize} OFFSET ${offset};`
        , function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
   
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`with t as (select peerID from Peers where symbol like '%${company}%')
        select companyName, peerID from CompanyInformation ci JOIN t on ci.symbol=t.peerID`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}


module.exports = {
    all_jobs,
    company_sentiment,
    company_jobs,
    company_news,
    all_companies,
    company_peer_info,
    company_info

}
