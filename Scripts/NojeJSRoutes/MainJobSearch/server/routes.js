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
async function all_jobs(req,res) {

 

    //sample URL = http://localhost:8080/jobs?industry=tech&jobTitle=data&jobType=intern&numEmployeesLow=100
    //sample url 2 http://localhost:8080/jobs?industry=%&jobTitle=Data&jobType=intern&numEmployeesLow=10000&ratingLow=3.5
    const industry=req.query.industry?req.query.industry : '%'
    const sector=req.query.sector?req.query.sector: '%'
    const symbol=req.query.symbol?req.query.symbol : '%'
    const cmpName = req.query.companyName?req.query.companyName : '%'
    const jobType = req.query.jobType?req.query.jobType : '%'
    const ratingLow = req.query.ratingLow?req.query.ratingLow : 0
    const ratingHigh = req.query.ratingHigh?req.query.ratingHigh : 5
    const numEmployeesLow = req.query.numEmployeesLow?req.query.numEmployeesLow : 0
    const numEmployeesHigh = req.query.numEmployeesHigh?req.query.numEmployeesHigh : 8000000000
    const jobTitle= req.query.jobTitle?req.query.jobTitle : '%'

    const query_job=`WITH TT as (
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


// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the FIFA server!`)
    } else {
        res.send(`Hello! Welcome to the FIFA server!`)
    }
}


// ********************************************
//                  WARM UP
// ********************************************

// Route 2 (handler)
async function jersey(req, res) {
    const colors = ['red', 'blue', 'white']
    const jersey_number = Math.floor(Math.random() * 20) + 1
    const name = req.query.name ? req.query.name : "player"

    connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
        FROM Matches
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
}

// ********************************************
//               GENERAL ROUTES
// ********************************************


// Route 3 (handler)
async function all_matches(req, res) {
    // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
    // We have partially implemented this function for you to
    // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
    // we didn't specify this default value for league, and you could change it if you want!
    // in reality, league will never be undefined since URLs will need to match matches/:league for the request to be routed here...
    const league = req.params.league ? req.params.league : 'D1'
    const page_size=req.query.pagesize ? req.query.pagesize : 10
    // use this league encoding in your query to furnish the correct results

    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec!
        // TODO: query and return results here:

        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
        FROM Matches
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam
        LIMIT ${((req.query.page-1)*page_size)},${page_size};`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
        FROM Matches
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

// Route 4 (handler)
async function all_players(req, res) {
    // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests

    const page_size=req.query.pagesize ? req.query.pagesize : 10


    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec!
        // TODO: query and return results here:

        connection.query(`SELECT PlayerId, Name, Nationality, OverallRating as Rating, Potential, Club, Value
          FROM Players
          ORDER by Name
          LIMIT ${((req.query.page-1)*page_size)},${page_size};`, function (error, results, fields) {

            if (error) {
                console.log(error)
                return res.json({ error: error })
            } else if (results) {
                return res.json({ results: results })
            }
        });
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`SELECT PlayerId, Name, Nationality, OverallRating as Rating, Potential, Club, Value
          FROM Players
          ORDER by Name;`, function (error, results, fields) {

            if (error) {
                console.log(error)
                return res.json({ error: error })
            } else if (results) {
                return res.json({ results: results })
            }
        });
    }

}


// ********************************************
//             MATCH-SPECIFIC ROUTES
// ********************************************

// Route 5 (handler)
async function match(req, res) {
    // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests

  if(req.query.id){
    connection.query(`SELECT MatchId, Date, Time, HomeTeam as Home, AwayTeam as Away, FullTimeGoalsH as HomeGoals,
       FullTimeGoalsA as AwayGoals, HalfTimeGoalsH as HTHomeGoals, HalfTimeGoalsA as HTAwayGoals,
       ShotsH as ShotsHome, ShotsA as ShotsAway, ShotsOnTargetH as ShotsOnTargetHome,
       ShotsOnTargetA as ShotsOnTargetAway, FoulsH as FoulsHome, FoulsA as FoulsAway,
       CornersH as CornersHome, CornersA as CornersAway, YellowCardsH as YCHome, YellowCardsA as YCAway,
       RedCardsH as RCHome, RedCardsA as RCAway
FROM Matches
WHERE MatchId =${req.query.id};`, function (error, results, fields) {

        if (error) {
            console.log(error)
            return res.json({ error: error })
        } else if (results) {
            return res.json({ results: results })
        }
    });

}
else{
return res.json({error:"Please specify the ID of the match as a query parameter. [Eg. /match?id=42]"})
}
}

// ********************************************
//            PLAYER-SPECIFIC ROUTES
// ********************************************


module.exports = {
    all_jobs,
    hello,
    jersey
}
