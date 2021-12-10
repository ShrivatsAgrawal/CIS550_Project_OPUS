import React from 'react';

import {
    Image, Descriptions, Badge, Progress
} from 'antd'

import { withRouter } from "react-router";
import { getCompanyInfo } from '../fetcher'
import MenuBar from '../components/MenuBar';


function ImageLoader(props) {
    return (
      <Image
        width={100}
        src={props.image}
      />
    );
  }


class CompanyInfoPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyInfo: Object
        }
    }

    componentDidMount() {
        const symbol = this.props.match.params.symbol;

        getCompanyInfo(symbol).then(res => {
            this.setState({ companyInfo: res.results[0] })
        })
    }

    render() {
        console.log(this.state.companyInfo);
        return (
            <div>
            <MenuBar symbol={this.state.companyInfo.symbol}/>
            <Descriptions title="Company Information" bordered>
                <Descriptions.Item label="Name">{this.state.companyInfo.companyName}</Descriptions.Item>
                <Descriptions.Item label="Logo"><ImageLoader image={this.state.companyInfo.image}/></Descriptions.Item>
                <Descriptions.Item label="Country">{this.state.companyInfo.country}</Descriptions.Item>
                <Descriptions.Item label="Sector">{this.state.companyInfo.sector}</Descriptions.Item>
                <Descriptions.Item label="Industry">{this.state.companyInfo.industry}</Descriptions.Item>
                <Descriptions.Item label="Symbol">{this.state.companyInfo.symbol}</Descriptions.Item>
                <Descriptions.Item label="Website" span={2}>
                    <a href={this.state.companyInfo.website} target="_blank" rel="noopener noreferrer">{this.state.companyInfo.website}</a>
                </Descriptions.Item>
                <Descriptions.Item label="Current Status">
                <Badge status="processing" text="Active" />
                </Descriptions.Item>
                <Descriptions.Item label="CEO">{this.state.companyInfo.ceo}</Descriptions.Item>
                <Descriptions.Item label="Full Time Employees">{this.state.companyInfo.fullTimeEmployees}</Descriptions.Item>
                <Descriptions.Item label="Company Size"><Progress
                    strokeColor={{
                        '0%': '#87d068',
                        '100%': '#108ee9',
                    }}
                    percent={75}
                    showInfo={false}
                /></Descriptions.Item>
                
            </Descriptions>
            <br/>
            <Descriptions title="Stock Information" bordered>
                <Descriptions.Item label="Exchange">{this.state.companyInfo.exchange}</Descriptions.Item>
                <Descriptions.Item label="Stock Price">{this.state.companyInfo.price}</Descriptions.Item>
                <Descriptions.Item label="Currency">{this.state.companyInfo.currency}</Descriptions.Item>
                <Descriptions.Item label="Exchange Short">{this.state.companyInfo.exchangeShortName}</Descriptions.Item>
                <Descriptions.Item label="Market Cap">{this.state.companyInfo.mktCap}</Descriptions.Item>
                <Descriptions.Item label="Volume Average">{this.state.companyInfo.volAvg}</Descriptions.Item>
            </Descriptions>    
            <br/>
            <Descriptions title="Contact Information" bordered>
            <Descriptions.Item label="Address" span={2}>{this.state.companyInfo.address}</Descriptions.Item>
            <Descriptions.Item label="City">{this.state.companyInfo.city}</Descriptions.Item>
            <Descriptions.Item label="State">{this.state.companyInfo.state}</Descriptions.Item>
            <Descriptions.Item label="Zip Code">{this.state.companyInfo.zip}</Descriptions.Item>
            
            <Descriptions.Item label="Phone Number">{this.state.companyInfo.phone}</Descriptions.Item>
            </Descriptions>
            <br/>
            <Descriptions title="Official Description of the Company">
                <Descriptions.Item>{this.state.companyInfo.description}</Descriptions.Item>
            </Descriptions>         
            </div>
        )
    }
}

export default withRouter(CompanyInfoPage)
