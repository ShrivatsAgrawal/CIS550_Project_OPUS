
import React from 'react';
import styled from 'styled-components'

import {
  Table,
  Select,
  Divider,
  Progress
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getCompanySentiment } from '../fetcher'
import { withRouter } from "react-router";

import Layout from '../components/layout'

const Container = styled.div`
  max-width: 100%;
  font-size: 2rem;
  @media only screen and (max-width: 768px) {
    max-width: 100%;
    font-size: 1.6rem;
  }
`

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
    sorter: (a, b) => a.sentiment - b.sentiment,
    render: (text, row) => <p><Progress percent = {Math.trunc(row.sentiment*100)}/></p>
    
},
/*{
    title: 'Popularity',
    dataIndex: 'absoluteIndex',
    key: 'absoluteIndex',
    sorter: (a, b) => a.absoluteIndex - b.absoluteIndex,
    render: (text, row) => <p><Progress size = 'small' percent = {Math.trunc(row.absoluteIndex*100)}/></p>    
}*/
];

class CompanySentimentPage extends React.Component {

  
  constructor(props) {
    super(props)
    const { symbol } = this.props.match.params;
    this.state = {
        companySentimentResults: 0,
        companyIndex: 0,
        avgPeerSentiment: 0,
        avgPeerIndex: 0,
        peerSentimentResults: [],
        symbol: symbol,
        companyName: ''
    }
}

  componentDidMount() {
    getCompanySentiment(this.state.symbol).then(res => {
      if (res === "no company") {this.setState({symbol: null})}
      this.setState({companyName: res.results[0].companyName})
      this.setState({ companySentimentResults: res.results[0].sentiment})
      this.setState({companyIndex: res.results[0].absoluteIndex})
      this.setState({ avgPeerSentiment: res.results[1].sentiment})
      this.setState({avgPeerIndex: res.results[1].absoluteIndex})
      this.setState({ peerSentimentResults: res.results.slice(2, res.results.length)})
    });
  }


  render() {

    return (
      <Layout symbol={this.props.match.params.symbol}>
        <Container>
       <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <Divider style={{color: 'inherit'}}>Company Sentiment for {this.state.companyName}</Divider>
          <p>Sentiment: what people think of this company<Progress percent={Math.trunc(this.state.companySentimentResults * 100)}/></p>
          {/*<p>Popularity: how much people talk about this company<Progress percent={Math.trunc(this.state.companyIndex * 100)}/></p>*/}
          <Divider style={{color: 'inherit'}}>Peer Sentiment</Divider>
          <p>Average Sentiment of Peers <Progress percent = {Math.trunc(this.state.avgPeerSentiment*100)}/></p>
          {/*<p>Average Popularity of Peers <Progress percent = {Math.trunc(this.state.avgPeerIndex*100)}/></p>*/}
          <h5 style={{color: 'inherit'}}>Peers</h5>
          <Table dataSource={this.state.peerSentimentResults} columns={companySentimentColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
        </Container>
      </Layout>
    )
  }

}

export default withRouter(CompanySentimentPage)
