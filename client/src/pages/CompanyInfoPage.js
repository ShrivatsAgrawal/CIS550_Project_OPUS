import React from 'react';

import { Container } from "shards-react";

import {
    Image, Descriptions, Badge
} from 'antd'

import { withRouter } from "react-router";
import { getCompanyInfo } from '../fetcher'

function ImageDemo(props) {
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
            <Descriptions title="Company Information" bordered>
                <Descriptions.Item label="Name">{this.state.companyInfo.companyName}</Descriptions.Item>
                <Descriptions.Item label="Logo"><ImageDemo image={this.state.companyInfo.image}/></Descriptions.Item>
                <Descriptions.Item label="Country">{this.state.companyInfo.country}</Descriptions.Item>
                <Descriptions.Item label="Sector">{this.state.companyInfo.sector}</Descriptions.Item>
                <Descriptions.Item label="Industry">{this.state.companyInfo.industry}</Descriptions.Item>
                <Descriptions.Item label="Symbol">{this.state.companyInfo.symbol}</Descriptions.Item>
                <Descriptions.Item label="Exchange">{this.state.companyInfo.exchange}</Descriptions.Item>
                <Descriptions.Item label="Stock Price">{this.state.companyInfo.price}</Descriptions.Item>
                <Descriptions.Item label="Currency">{this.state.companyInfo.currency}</Descriptions.Item>
                

                <Descriptions.Item label="Website" span={2}>
                    <a href={this.state.companyInfo.website} target="_blank" rel="noopener noreferrer">{this.state.companyInfo.website}</a>
                </Descriptions.Item>
                <Descriptions.Item label="Current Status">
                <Badge status="processing" text="Active" />
                </Descriptions.Item>
                <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                <Descriptions.Item label="Config Info">
                Data disk type: MongoDB
                <br />
                Database version: 3.4
                <br />
                Package: dds.mongo.mid
                <br />
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China 1<br />
                </Descriptions.Item>
            </Descriptions>
    
            </div>
        )
    }
}

export default withRouter(CompanyInfoPage)
