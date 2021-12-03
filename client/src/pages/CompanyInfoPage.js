import React from 'react';
import { Container } from "shards-react";

import {
    Image
} from 'antd'

import { withRouter } from "react-router";
import { getCompanyInfo } from '../fetcher'
import { OmitProps } from 'antd/lib/transfer/ListBody';

function ImageDemo(props) {
    return (
      <Image
        width={200}
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
                <ImageDemo image={this.state.companyInfo.image}/>
                This company is {this.state.companyInfo.companyName}.
            </div>
        )
    }
}

export default withRouter(CompanyInfoPage)
