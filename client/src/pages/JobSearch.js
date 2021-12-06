import React from 'react';

import { Form, FormInput, FormGroup, Button } from "shards-react";

import {
    Table,
    Row,
    Col,
    Divider,
    Slider,
    Switch
} from 'antd'

import { withRouter } from "react-router";
import { getJobs } from '../fetcher'

const jobColumns = [
    {
        title: 'Symbol',
        dataIndex: 'companySymbol',
        key: 'companySymbol',
        sorter: (a, b) => a.companySymbol.localeCompare(b.companySymbol),
        render: (text, row) => <a href = {`/company/info/${row.symbol}`}>{text}</a>
  },
  {
      title: 'Name',
      dataIndex: 'companyName',
      key: 'companyName',
      sorter: (a, b) => a.jobCompany.localeCompare(b.jobCompany),
      render: (text, row) => <a href={`${row.companyLink}`}>{text}</a>
  },
  {
    title: 'Number of Employees',
    dataIndex: 'fullTimeEmployees',
    key: 'fullTimeEmployees',
    sorter: (a, b) => a.fullTimeEmployees - b.fullTimeEmployees
  },
  {
    title: 'Rating',
    dataIndex: 'companyRating',
    key: 'companyRating',
    sorter: (a, b) => a.companyRating - b.companyRating,
    render: (text, row) => <div>{text?.toFixed(1)}⭐</div> 
},

{
    title: 'Industry',
    dataIndex: 'industry',
    key: 'industry',
    sorter: (a, b) => a.industry.localeCompare(b.industry)
},
{
    title: 'Sector',
    dataIndex: 'sector',
    key: 'sector',
    sorter: (a, b) => a.sector.localeCompare(b.sector)
},
{
    title: 'Job Title',
    dataIndex: 'jobTitle',
    key: 'jobTitle',
    sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
    render: (text, row) => <a href={`${row.jobLink}`}>{text}</a>
    
  },
  {
    title: 'Location',
    dataIndex: 'jobLocation',
    key: 'jobLocation'
  },
  {
    title: 'Job Type',
    dataIndex: 'jobType',
    key: 'jobType',
    sorter: (a, b) => a.jobType.localeCompare(b.jobType)
    
  },
  {
    title: 'More Jobs',
    dataIndex: 'searchLink',
    key: 'searchLink',
    render: (text, row) => <a href={`${row.searchLink}`}>Link</a>
  },    
  ];

class JobSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameQuery: '',
            industryQuery: '',
            sectorQuery: '',
            jobTitleQuery: '',
            jobTypeQuery: 'NRML',
            employeeHighQuery: 8000000000,
            employeeLowQuery: 0,
            ratingHighQuery: 5,
            ratingLowQuery: 0,
            jobsResults: []
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
        this.handleIndustryQueryChange = this.handleIndustryQueryChange.bind(this)
        this.handleSectorQueryChange = this.handleSectorQueryChange.bind(this)
        this.handleJobTitleQueryChange = this.handleJobTitleQueryChange.bind(this)
        
        this.handleEmployeeMinChange = this.handleEmployeeMinChange.bind(this)
        this.handleEmployeeMaxChange = this.handleEmployeeMaxChange.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.handleJobTypeChange = this.handleJobTypeChange.bind(this)        
    }

    handleJobTypeChange(value) {
        if (value){
            this.setState({ jobTypeQuery: 'NRML'})
        }
        else {
            this.setState({ jobTypeQuery: 'Intern'})
        }
    }

    handleNameQueryChange(event) {
        this.setState({ nameQuery: event.target.value })
    }

    handleIndustryQueryChange(event) {
        this.setState({ industryQuery: event.target.value })
    }

    handleSectorQueryChange(event) {
        this.setState({ sectorQuery: event.target.value })
    }

    handleJobTitleQueryChange(event) {
        this.setState({ jobTitleQuery: event.target.value })
    }

    handleEmployeeMinChange(event) {
        this.setState({ employeeLowQuery: event.target.value })
    }

    handleEmployeeMaxChange(event) {
        this.setState({ employeeHighQuery: event.target.value })
    }

    handleRatingChange(value) {
        this.setState({ ratingLowQuery: value[0] })
        this.setState({ ratingHighQuery: value[1] })
    }

    
    updateSearchResults() {
        getJobs(this.state.nameQuery, this.state.employeeLowQuery, this.state.employeeHighQuery, this.state.industryQuery, this.state.sectorQuery, this.state.jobTypeQuery, this.state.ratingLowQuery, this.state.ratingHighQuery, this.state.jobTitleQuery).then(res => {
            this.setState({ jobsResults: res.results })
        })
    }

    componentDidMount() {
        getJobs(this.state.nameQuery, this.state.employeeLowQuery, this.state.employeeHighQuery, this.state.industryQuery, this.state.sectorQuery, this.state.jobTypeQuery, this.state.ratingLowQuery, this.state.ratingHighQuery, this.state.jobTitleQuery).then(res => {
            this.setState({ jobsResults: res.results })
        })
    }

    render() {
        return (
            <div>
                <Form style={{ width: '100vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Name</label>
                            <FormInput placeholder="Apple or probably Guava?" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Industry</label>
                            <FormInput placeholder="Electronics?" value={this.state.industryQuery} onChange={this.handleIndustryQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Sector</label>
                            <FormInput placeholder="Tech?" value={this.state.sectorQuery} onChange={this.handleSectorQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Job Title</label>
                            <FormInput placeholder="Looking for something fancy?" value={this.state.jobTitleQuery} onChange={this.handleJobTitleQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col offset={2} flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Rating ⭐</label>
                            <Slider range min={0} max={5} step={0.1} defaultValue={[0, 5]} onChange={this.handleRatingChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Minimum Employees</label>
                            <FormInput placeholder="0? Even a startup will have 1!" value={this.state.employeeLowQuery} onChange={this.handleEmployeeMinChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Maximum Employees</label>
                            <FormInput placeholder="A relatively high number!" value={this.state.employeeHighQuery} onChange={this.handleEmployeeMaxChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                        <Switch style={{ marginLeft: '6vh', marginTop: '5vh' }} checkedChildren="NRML" unCheckedChildren="Intern" defaultChecked onChange={this.handleJobTypeChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                    <Divider />
                    <Table dataSource={this.state.jobsResults} columns={jobColumns} pagination={{ pageSizeOptions:[10, 50], defaultPageSize: 10, showQuickJumper:true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}/>
                </Form>
            </div>
        )
    }
}

export default withRouter(JobSearch)
