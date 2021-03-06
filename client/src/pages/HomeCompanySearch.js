import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components'

import { Form, FormInput, FormGroup, Button } from "shards-react";

import {
    Table,
    Row,
    Image,
    Col,
    Divider,
    Slider
} from 'antd'

import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";
  
import { withRouter } from "react-router";
import { getCompanies } from '../fetcher'

import Layout from '../components/layout'

const Container = styled.div`
  max-width: 100%;
  font-size: 2rem;
  @media only screen and (max-width: 768px) {
    max-width: 100%;
    font-size: 1.6rem;
  }
`

const companyColumns = [
    {
        title: 'Symbol',
        dataIndex: 'companySymbol',
        key: 'companySymbol',
        sorter: (a, b) => a.companySymbol.localeCompare(b.companySymbol),
        render: (text, row) => <a href = {`/company/info/${row.companySymbol}`}>{text}</a>
  },
  {
      title: 'Name',
      dataIndex: 'companyName',
      key: 'companyName',
      sorter: (a, b) => a.jobCompany.localeCompare(b.jobCompany),
  },
  
  {
    title: 'Number of Employees',
    dataIndex: 'fullTimeEmployees',
    key: 'fullTimeEmployees',
    sorter: (a, b) => a.fullTimeEmployees - b.fullTimeEmployees
  },
  {
    title: 'Market Cap',
    dataIndex: 'mktCap',
    key: 'mktCap',
    sorter: (a, b) => a.mktCap - b.mktCap
  },
  {
    title: 'Sentiment',
    dataIndex: 'sentiment',
    key: 'sentiment',
    sorter: (a, b) => a.sentiment - b.sentiment
  },
  {
    title: 'Number of Jobs',
    dataIndex: 'JobCount',
    key: 'JobCount',
    sorter: (a, b) => a.JobCount - b.JobCount
  },
  {
    title: 'Rating',
    dataIndex: 'companyRating',
    key: 'companyRating',
    sorter: (a, b) => a.companyRating - b.companyRating,
    render: (text, row) => <div>{text?.toFixed(1)}⭐</div> 
},
  ];

class HomeCompanySearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameQuery: '',
            employeeHighQuery: 8000000000,
            employeeLowQuery: 0,
            mktcapHighQuery: 1000000000000000,
            mktcapLowQuery: 0,
            sentiHighQuery: 1,
            sentiLowQuery: 0,
            jobNumQuery: 5,
            companiesResults: []
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
        
        this.handleEmployeeMinChange = this.handleEmployeeMinChange.bind(this)
        this.handleEmployeeMaxChange = this.handleEmployeeMaxChange.bind(this)
        this.handleMktcapMinChange = this.handleMktcapMinChange.bind(this)
        this.handleMktcapMaxChange = this.handleMktcapMaxChange.bind(this)

        this.handleSentimentChange = this.handleSentimentChange.bind(this)
        this.handleJobNumChange = this.handleJobNumChange.bind(this)
    }

    handleNameQueryChange(event) {
        this.setState({ nameQuery: event.target.value })
    }

    handleEmployeeMinChange(event) {
        this.setState({ employeeLowQuery: event.target.value })
    }

    handleEmployeeMaxChange(event) {
        this.setState({ employeeHighQuery: event.target.value })
    }

    handleMktcapMaxChange(event) {
        this.setState({ mktcapHighQuery: event.target.value })
    }

    handleMktcapMinChange(event) {
        this.setState({ mktcapLowQuery: event.target.value })
    }

    handleSentimentChange(value) {
        this.setState({ sentiLowQuery: value[0] })
        this.setState({ sentiHighQuery: value[1] })
    }

    handleJobNumChange(event) {
        this.setState({ jobNumQuery: event.target.value })
    }

    updateSearchResults() {
        getCompanies(this.state.nameQuery, this.state.employeeLowQuery, this.state.employeeHighQuery, this.state.mktcapLowQuery, this.state.mktcapHighQuery, this.state.sentiLowQuery, this.state.sentiHighQuery, this.state.jobNumQuery).then(res => {
            this.setState({ companiesResults: res.results })
        })
    }    

    componentDidMount() {
        getCompanies(this.state.nameQuery, this.state.employeeLowQuery, this.state.employeeHighQuery, this.state.mktcapLowQuery, this.state.mktcapHighQuery, this.state.sentiLowQuery, this.state.sentiHighQuery, this.state.jobNumQuery).then(res => {
            this.setState({ companiesResults: res.results })
        })
    }

    render() {
        return (
            <Layout>
            <Container style={{ color: 'inherit' }}>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>
                <h1 style={{color: 'inherit'}}> OPUS </h1>
            </div>
            <br />
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '0vh'}}>
                <h4 style={{color: 'inherit'}}>Helping Students Find Work</h4>
            </div>
                <Form style={{ color: 'inherit', fontSize: '1rem', maxWidth: '100%', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{color: 'inherit', maxWidth: '90%', margin: '0 auto' }}>
                            <label>Name</label>
                            <FormInput placeholder="Apple or try Guava?" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ maxWidth: '90%', margin: '0 auto' }}>
                            <label>Min Jobs</label>
                            <FormInput placeholder="0? Already Employed? Party!" value={this.state.jobNumQuery} onChange={this.handleJobNumChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ maxWidth: '90%', margin: '0 auto' }}>
                            <label>Min Employees</label>
                            <FormInput placeholder="0? Even a startup will have 1!" value={this.state.employeeLowQuery} onChange={this.handleEmployeeMinChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ maxWidth: '90%', margin: '0 auto' }}>
                            <label>Max Employees</label>
                            <FormInput placeholder="A relatively high number!" value={this.state.employeeHighQuery} onChange={this.handleEmployeeMaxChange} />
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col offset={2} flex={2}><FormGroup style={{ maxWidth: '100%', margin: '0 auto' }}>
                            <label>Sentiment</label>
                            <Slider range min={0} max={1} step={0.01} defaultValue={[0, 1]} onChange={this.handleSentimentChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ maxWidth: '75%', margin: '0 auto' }}>
                            <label>Min Market Cap</label>
                            <FormInput placeholder="Is 0 even possible?" value={this.state.mktcapLowQuery} onChange={this.handleMktcapMinChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ maxWidth: '75%', margin: '0 auto' }}>
                            <label>Max Market Cap</label>
                            <FormInput placeholder="A very very high number!" value={this.state.mktcapHighQuery} onChange={this.handleMktcapMaxChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ maxWidth: '25%', margin: '0 auto'}}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                    <Divider />
                    <Table dataSource={this.state.companiesResults} columns={companyColumns} pagination={{ pageSizeOptions:[10, 50], defaultPageSize: 10, showQuickJumper:true }} style={{ maxWidth: '100%', color: 'inherit', margin: '0 auto', marginTop: '2vh' }}/>
                </Form>
                </Container>
            </Layout>
        )
    }
}

export default withRouter(HomeCompanySearch)
