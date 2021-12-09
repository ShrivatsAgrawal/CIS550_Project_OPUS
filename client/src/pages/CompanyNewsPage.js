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
const numEachPage =4



   
class CompanyNewsPage extends React.Component {

  
  constructor(props) {
    super(props)
    const { symbol } = this.props.match.params;
    this.state = {
      minValue: 0,
      maxValue: 9,
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
handleChange = value => {
  if (value <= 1) {
    this.setState({
      minValue: 0,
      maxValue: 9
    });
  } else {
    this.setState({
      minValue: this.state.maxValue,
      maxValue: value * 9
    });
  }
};

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
  
          {this.state.companyNewsResults &&
          this.state.companyNewsResults.length > 0 &&
          this.state.companyNewsResults.slice(this.state.minValue, this.state.maxValue).map(({title,image,text,url,site,publishedDate,cmpRel}) => (
            <Card style={{
              display: "inline-block",
              margin: "0 2px",
              transform: "scale(0.95)",
             
                borderWidth: 50, 
                shadowColor: 'red', 
                shadowOffset: { height: 3, width: 1 },
                shadowOpacity: 0.9,
                shadowRadius: 0.0,
            }} onClick={()=>{}}>
            <CardBody>
            <CardTitle ><a href={url}>{title}</a><br></br></CardTitle>
            <CardSubtitle><br></br>Source: {site}</CardSubtitle>
            <CardImg src={image} />
            <CardSubtitle>{publishedDate}</CardSubtitle> 
            <CardText>{text}</CardText>
            
            </CardBody>
            </Card> 
    
          ))}
          <Pagination style={{textAlign: "center"
            }} 
          defaultCurrent={1}
          defaultPageSize={numEachPage} //default size of page
          onChange={this.handleChange}
          total={this.state.companyNewsResults.length} //total number of card data available
        />
          
               

          </div>
      </div>
    )
  }

}

export default withRouter(CompanyNewsPage)

