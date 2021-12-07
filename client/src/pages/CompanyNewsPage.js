import React from 'react';
import {
  Table,
  Pagination,
  Select,
  Switch
} from 'antd'

 import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, CardText, Progress ,CardImg, CardSubtitle} from "shards-react";

 import { withRouter } from "react-router";
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
  
},{
  title: 'Site',
  dataIndex: 'site',
  key: 'site',
  
  
},
{
  title: 'Text',
  dataIndex: 'text',
  key: 'text',
  
  
},
{
  title: 'Url',
  dataIndex: 'url',
  key: 'url',
 
 
 render: (text, row) => <a href={row.url}>{}</a>
  
}
];

   
class CompanyNewsPage extends React.Component {

  
  constructor(props) {
    super(props)
    const { symbol } = this.props.match.params;
    this.state = {
    companyNewsResults: [],
    allNewsResults: [],
    companyNewsPageNumber: 1,
    companyNewsPageSize: 10000,
    pagination: null,
    companyTitle:'',
    symbol: symbol
    
}
this.peerOnChange = this.peerOnChange.bind(this)
}

peerOnChange(value) {
    
  if (value){
    this.setState({companyNewsResults : this.state.allNewsResults})
  //console.log(`Something is executing ${value}`)
            }
  else {
    this.setState( {companyNewsResults : this.state.allNewsResults.filter(item => item.cmpRel == "SELF")})
  }
}

  componentDidMount() {
    
    getCompanyNews(this.state.companyNewsPageNumber, this.state.companyNewsPageSize,this.state.symbol).then(res => {
      
      console.log(res.results)
      this.setState({ companyNewsResults: res.results, allNewsResults : res.results})
      
})

}

  render() {

    return (
      <div>        
       <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>News</h3>
          <h5>News by Peers <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked onChange={this.peerOnChange} /></h5>
  
          {this.state.companyNewsResults.map(({title,image,text,url,site,publishedDate,cmpRel})=>{
            return (
        <Card className="card-style" onClick={()=>{}}>
        <CardBody>
        <CardTitle ><a href={url}>{title}</a></CardTitle>
        <CardSubtitle>Source: {site}</CardSubtitle>
        
        <CardImg src={image} />
        <CardSubtitle>{publishedDate}</CardSubtitle> 
        <CardText>{text}</CardText>
        
        </CardBody>
        </Card>  
            )
          })}
          
               

          </div>
      </div>
    )
  }

}

export default withRouter(CompanyNewsPage)

