import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getCompanyNews } from '../fetcher'
import { useParams } from 'react-router-dom';
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const companyNewsColumns = [
{
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
    sorter: (a, b) => a.symbol.localeCompare(b.symbol)
},
{
    title: 'PublishedDate',
    dataIndex: 'publishedDate',
    key: 'publishedDate',
    sorter: (a, b) => a.publishedDate.localeCompare(b.publishedDate)
},
{
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
    
},
{
  title: 'Image',
  dataIndex: 'image',
  key: 'image',
  //sorter: (a, b) => a.sentiment - b.sentiment
  
},{
  title: 'Site',
  dataIndex: 'site',
  key: 'site',
  //sorter: (a, b) => a.sentiment - b.sentiment
  
},
{
  title: 'Text',
  dataIndex: 'text',
  key: 'text',
  //sorter: (a, b) => a.sentiment - b.sentiment
  
},
{
  title: 'Url',
  dataIndex: 'url',
  key: 'url',
 //sorter: (a, b) => a.sentiment - b.sentiment
 Cell: e =><a href={e.url}> {e.url} </a>
  
}
];

class CompanyNewsPage extends React.Component {

  
  constructor(props) {
    super(props)
    //const { symbol } = this.props.match.params;
    this.state = {
    companyNewsResults: [],
    companyNewsPageNumber: 1,
    companyNewsPageSize: 12,
    pagination: null 
    
}
}

  componentDidMount() {
    
    getCompanyNews(null,null,'a').then(res => {
      console.log(res)
      this.setState({ companyNewsResults: res.results})
})

}

  render() {

    return (
      <div>        
       <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>News</h3>
          <Table dataSource={this.state.companyNewsResults} columns={companyNewsColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/> 
        </div>
      </div>
    )
  }

}

export default CompanyNewsPage

