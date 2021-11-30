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


import { getCompanyInfo } from '../fetcher'
const wideFormat = format('.3r');

class CompanyInfoPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount() {
        getCompanyInfo(this.props.symbol).then(res => {
            this.setState({ companyInfo: res.results })
        })
    }

    render() {
        return (
            <div>
                This company is {this.state.companyInfo.name}. We pray to Lord Shrivats!
            </div>
        )
    }
}

export default CompanyInfoPage
