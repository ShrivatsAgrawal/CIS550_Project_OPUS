import React from 'react';
import {
  Table,
  Pagination,
  Select,
  Switch
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getCompanyJobs } from '../fetcher'
import { withRouter } from "react-router";
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const companyJobColumns = [
  {
      title: 'Symbol',
      dataIndex: 'companySymbol',
      key: 'companySymbol',
      sorter: (a, b) => a.companySymbol.localeCompare(b.companySymbol)//,
      //render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>
},
{
    title: 'Name',
    dataIndex: 'jobCompany',
    key: 'jobCompany',
    sorter: (a, b) => a.jobCompany.localeCompare(b.jobCompany),
    render: (text, row) => <a href={`${row.companyLink}`}>{text}</a>
},
{
    title: 'Rating',
    dataIndex: 'companyRating',
    key: 'CompanyRating',
    sorter: (a, b) => a.CompanyRating - b.CompanyRating
    
},

{
  title: 'Job Title',
  dataIndex: 'jobTitle',
  key: 'jobTitle',
  sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
  render: (text, row) => <a href={`${row.jobLink}`}>{text}</a>
  
},
{
  title: 'Location',
  dataIndex: 'jobLocation',
  key: 'jobLocation'
},
{
  title: 'Job Type',
  dataIndex: 'jobType',
  key: 'jobType',
  sorter: (a, b) => a.jobType.localeCompare(b.jobType)
  
},
{
  title: 'Description',
  dataIndex: 'shortDescription',
  key: 'shortDescription'
  
},
{
  title: 'Salary',
  dataIndex: 'salary',
  key: 'salary'
  
},
{
  title: 'More Jobs',
  dataIndex: 'searchLink',
  key: 'searchLink',
  render: (text, row) => <a href={`${row.searchLink}`}>{text}</a>
  
},
{
  title: 'SELF/PEER',
  dataIndex: 'cmpType',
  key: 'cmpType',
  sorter: (a, b) => a.cmpType.localeCompare(b.cmpType)
  
},
];

class CompanyJobsPage extends React.Component {

  
  constructor(props) {
    super(props)
    const symbol  = this.props.match.params.symbol;
    this.state = {
    companyJobResults: [],
    allJobResults: [],
    companyJobsPageNumber: 1,
    companyJobsPageSize: 10000,
    pagination: null ,
    symbol:symbol
    //symbol : symbol
    
}

    this.peerOnChange = this.peerOnChange.bind(this)
    //this.goToMatch = this.goToMatch.bind(this)
}
  

  /*goToMatch(matchId) {
    window.location = `/matches?id=${matchId}`
}*/

  peerOnChange(value) {
    
  if (value){
    this.setState({companyJobResults : this.state.allJobResults})
  //console.log(`Something is executing ${value}`)
            }
  else {
    this.setState( {companyJobResults : this.state.allJobResults.filter(item => item.cmpType == "SELF")})
  }
}

  componentDidMount() {
    //const symbol = this.props.match.params.symbol;
    getCompanyJobs(this.state.companyJobsPageNumber, this.state.companyJobsPageSize, this.state.symbol).then(res => {
      console.log(res)
        //console.log("Symbol:"+this.state.symbol)
      this.setState({ companyJobResults: res.results , allJobResults : res.results})
      
})


}


  render() {

    return (
      <div>
       <MenuBar symbol={this.state.symbol}/>
       <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Jobs by {this.state.symbol}</h3> 
          <br />
          <h5>Jobs by Peers <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked onChange={this.peerOnChange} /></h5>
          <Table dataSource={this.state.companyJobResults} columns={companyJobColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
      </div>
    )
  }

}

export default withRouter(CompanyJobsPage)

