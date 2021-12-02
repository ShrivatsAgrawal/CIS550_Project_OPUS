
import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getCompanySentiment } from '../fetcher'
import { useParams } from 'react-router-dom';
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const companySentimentColumns = [
  {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      sorter: (a, b) => a.symbol.localeCompare(b.symbol)
},
{
    title: 'Name',
    dataIndex: 'companyName',
    key: 'companyName',
    sorter: (a, b) => a.companyName.localeCompare(b.companyName),
},
{
    title: 'Sentiment',
    dataIndex: 'sentiment',
    key: 'sentiment',
    sorter: (a, b) => a.sentiment - b.sentiment
    
}
];

class CompanySentimentPage extends React.Component {

  
  constructor(props) {
    super(props)
    //const { symbol } = this.props.match.params;
    this.state = {
    companySentimentResults: [],
    companySentimentPageNumber: 1,
    companySentimentPageSize: 12,
    pagination: null 
    
}
}

  componentDidMount() {
    
    getCompanySentiment(this.state.companySentimentPageNumber, this.state.companySentimentPageSize, 'AAPL').then(res => {
      console.log(res)
      this.setState({ companySentimentResults: res.results})
})

}


  render() {

    return (
      <div>
        
       <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Jobs</h3>
          <Table dataSource={this.state.companySentimentResults} columns={companySentimentColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
      </div>
    )
  }

}

export default CompanySentimentPage
