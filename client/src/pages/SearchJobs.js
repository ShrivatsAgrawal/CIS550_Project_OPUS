import React from 'react';
import {
  Table,
  Select
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
  key: 'salary',
  sorter: (a, b) => a.salary.localeCompare(b.salary),
  
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

class SearchJobsPage extends React.Component {

  
  constructor(props) {
    super(props)
    const symbol  = this.props.match.params.symbol;
    this.state = {
    companyJobResults: [],
    companyJobsPageNumber: 1,
    companyJobsPageSize: 10000,
    pagination: null ,
    symbol:symbol
}
}
  
  componentDidMount() {
    getCompanyJobs(this.state.companyJobsPageNumber, this.state.companyJobsPageSize, this.state.symbol).then(res => {
      this.setState({ companyJobResults: res.results})
})
}


  render() {

    return (
      <div>
       <MenuBar symbol={this.state.symbol}/>    
       <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Jobs by {this.state.symbol} and Peers</h3>
          <Table dataSource={this.state.companyJobResults} columns={companyJobColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
      </div>
    )
  }

}

export default withRouter(SearchJobsPage)