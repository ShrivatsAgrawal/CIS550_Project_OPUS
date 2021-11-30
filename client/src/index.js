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

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        
		<Route exact
							path="/company/jobs/:symbol"
							render={() => (
								<CompanyJobsPage />
							)}/>

		<Route exact
							path="/company/info/:symbol"
							render={() => (
								<CompanyInfoPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

