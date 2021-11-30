import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import MatchesPage from './pages/MatchesPage';
import CompanyJobsPage from './pages/CompanyJobsPage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
							path="/players"
							render={() => (
								<PlayersPage />
							)}/>
        <Route exact
							path="/matches"
							render={() => (
								<MatchesPage />
							)}/>
		<Route exact
							path="/company/jobs/:symbol"
							render={() => (
								<CompanyJobsPage />
							)}/>

		<Route exact
							path="/company/:symbol"
							render={() => (
								<CompanyInfoPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

