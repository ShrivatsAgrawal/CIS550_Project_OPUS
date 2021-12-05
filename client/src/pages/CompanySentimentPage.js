
import React from 'react';
import {
  Table,
  Select,
  Divider
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getCompanySentiment } from '../fetcher'
import { withRouter } from "react-router";
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const companySentimentColumns = [
  {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text, row) => <a href = {`${row.symbol}`}>{text}</a>
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
    const { symbol } = this.props.match.params;
    this.state = {
        companySentimentResults: 0,
        avgPeerSentiment: 0,
        peerSentimentResults: [],
        symbol: symbol,
        companyName: ''
    }
}

  componentDidMount() {
    getCompanySentiment(this.state.symbol).then(res => {
      console.log(res);
      this.setState({companyName: res.results[0].companyName})
      this.setState({ companySentimentResults: res.results[0].sentiment})
      this.setState({ avgPeerSentiment: res.results[1].sentiment})
      this.setState({ peerSentimentResults: res.results.slice(2, res.results.length)})
    });
  }


  render() {

    return (
      <div>
        
       <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <Divider>Company Sentiment for {this.state.companyName}</Divider>
          <p>Sentiment: {this.state.companySentimentResults}</p>
          <Divider>Peer Sentiment</Divider>
          <p>Average of Peers: {this.state.avgPeerSentiment}</p>
          <h5>Peers</h5>
          <Table dataSource={this.state.peerSentimentResults} columns={companySentimentColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
      </div>
    )
  }

}

export default withRouter(CompanySentimentPage)
