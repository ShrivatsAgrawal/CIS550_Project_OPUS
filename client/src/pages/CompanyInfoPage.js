import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate 
} from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";

import { getCompanyInfo } from '../fetcher'
const wideFormat = format('.3r');

class CompanyInfoPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            compInfo: 'Sample'
        }
    }

    componentDidMount() {
        const symbol = 'AAPL' 
        // this.props.match.params.symbol;

        getCompanyInfo(symbol).then(res => {
            this.setState({ compName: res.results.companyName })
        })
        
    }

    render() {
        return (
            <div>
                This company is {this.state.compName}. We pray to Lord Shrivats!
            </div>
        )
    }
}

export default CompanyInfoPage
