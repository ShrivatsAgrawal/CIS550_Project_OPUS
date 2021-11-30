import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getCompanyJobs } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


/*const companyJobColumns = [
  {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      sorter: (a, b) => a.Name.localeCompare(b.Name),
      render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>
},
{
    title: 'Nationality',
    dataIndex: 'Nationality',
    key: 'Nationality',
    sorter: (a, b) => a.Nationality.localeCompare(b.Nationality)
},
{
    title: 'Rating',
    dataIndex: 'Rating',
    key: 'Rating',
    sorter: (a, b) => a.Rating - b.Rating
    
},
{
  title: 'Potential',
  dataIndex: 'Potential',
  key: 'Potential',
  sorter: (a, b) => a.Potential - b.Potential
  
},
{
  title: 'Club',
  dataIndex: 'Club',
  key: 'Club',
  sorter: (a, b) => a.Club.localeCompare(b.Club)
  
},
{
  title: 'Value',
  dataIndex: 'Value',
  key: 'Value',
  
  
},

];*/

class CompanyJobsPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    companyJobResults: [],
    companyJobsPageNumber: 1,
    companyJobsPageSize: 10,
    pagination: null  
}

    //this.leagueOnChange = this.leagueOnChange.bind(this)
    //this.goToMatch = this.goToMatch.bind(this)
}


  /*goToMatch(matchId) {
    window.location = `/matches?id=${matchId}`
}*/

  /*leagueOnChange(value) {
    // TASK 2: this value should be used as a parameter to call getCompanyJobs in fetcher.js with the parameters page and pageSize set to null
    // then, companyJobResults in state should be set to the results returned - see a similar function call in componentDidMount()
    getCompanyJobs(null, null, value).then(res => {
      this.setState({ companyJobResults: res.results })
  })
}*/

  componentDidMount() {
    getCompanyJobs(1, 10, 'AAPL').then(res => {
      this.setState({ companyJobResults: res.results })
})
/*
    getAllPlayers().then(res => {
      console.log(res.results)
      // TASK 1: set the correct state attribute to res.results
      this.setState({ playersResults:res.results})
})*/
}


  render() {

    return (
      <div>
          Hallelujah!
       {this.state.companyJobResults}
      </div>
    )
  }

}

export default CompanyJobsPage

