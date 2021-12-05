import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import CompanyJobsPage from './pages/CompanyJobsPage';
import CompanyInfoPage from './pages/CompanyInfoPage';
import CompanySentimentPage from './pages/CompanySentimentPage';
<<<<<<< HEAD
import CompanyNewsPage from './pages/CompanyNewsPage';
=======
import SearchJobsPage from './pages/SearchJobs'
>>>>>>> 12c92a0a2eca6999477d944c5dddb134b6591e41

ReactDOM.render(
  <div>
    <Router>
      <Switch>
	  <Route exact
							path="/search/jobs/:symbol"
							render={() => (
								<SearchJobsPage />
							)}/>

		<Route exact
							path="/company/jobs/:symbol"
							render={() => (
								<CompanyJobsPage />
							)
							}/>

		<Route exact
							path="/company/info/:symbol"
							render={() => (
								<CompanyInfoPage />
							)}/>

		<Route exact
							path="/company/sentiment/:symbol"
							render={() => (
								<CompanySentimentPage />
							)}/>
<<<<<<< HEAD
		<Route exact
							path="/company/news/:symbol"
							render={() => (
								<CompanyNewsPage />
							)}/>
=======

		
>>>>>>> 12c92a0a2eca6999477d944c5dddb134b6591e41
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

