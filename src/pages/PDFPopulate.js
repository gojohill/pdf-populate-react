import React from 'react';
import populate_constants from '../Constants/populate_constants';
import ShowPdf from './ShowPdf';
import DisplayPDF from './DisplayPDF';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import axios from 'axios';

// Consume the POST API

class ConsumePost extends React.Component {

    constructor() {
        super();
        this.state = {
            tabIndex: 0,
            pdf: "",
            tab2Style: { fontSize: "25px", backgroundColor: "lightgreen" },
            api_data: [],
            responseOk: true,
            errorMessage: "",
            responseMessage: "true",
            send_hdr: populate_constants.hdr,
            send_data: populate_constants.data,
            body_data: {
                fileId: "1193ff79-f50e-4fdc-bb82-a103fd4abf13",
                includeOffBtns: true,
                includeBlankTxt: true
            },
            username: "Packman",
            password: "Packman123"
        };
    }

    componentDidMount() {
        //this.postCall();
    }

    // when data in a field is changed the state is updated
    onTextChange = (fieldName, value) => {
        console.log("in here" + fieldName + " " + value)
        switch (fieldName) {
            case "fileId":
                this.setState({
                    body_data: {
                        "fileId": value,
                        "includeOffBtns": this.state.body_data.includeOffBtns,
                        "includeBlankTxt": this.state.body_data.includeBlankTxt
                    }
                })
                break;
            case "includeOffBtns":
                this.setState({
                    body_data: {
                        "fileId": this.state.body_data.fileId,
                        "includeOffBtns": value,
                        "includeBlankTxt": this.state.body_data.includeBlankTxt
                    }
                })
                break;
            case "includeBlankTxt":
                this.setState({
                    body_data: {
                        "fileId": this.state.body_data.fileId,
                        "includeOffBtns": this.state.body_data.includeOffBtns,
                        "includeBlankTxt": value
                    }
                })
                break;
            case "username":
                this.setState({
                    "username": value
                })
                break;
            case "password":
                this.setState({
                    "password": value
                })
                break;
            default:
                break;
        }
    }

    // call the API with a POST
    postCall = () => {

        this.setState ({
            pdf: null
        })
        
        console.log("in postCall")
        axios({
            method: 'post',
            url: 'http://localhost:8090/pdf/populate/' + this.state.body_data.fileId,
            data: {
                hdr: this.state.send_hdr,
                data: this.state.send_data
            },
            withCredentials: false,
            responseType: 'blob',
            auth: {
                username: this.state.username,
                password: this.state.password
            },
        }).then((response) => {


            //Create a Blob from the PDF Stream
            const file = new Blob(
                [response.data],
                { type: 'application/pdf' });
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            //window.open(fileURL);



            this.setState({
                responseOk: true,
                errorMessage: response.status,
                responseMessage: "true",
                tab2Style: {
                    fontSize: "25px",
                    backgroundColor: "lightgreen"
                },
                api_data: response.data,
                pdf: fileURL
            })

            // if you want a popup un comment this.
            //window.open(this.state.pdf)
        })
            .catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    this.setState({
                        responseOk: false,
                        errorMessage: error.message,
                        tab2Style: {
                            fontSize: "25px",
                            backgroundColor: "yellow"
                        },
                        api_data: []
                    })
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    this.setState({
                        responseOk: false,
                        errorMessage: error.message,
                        tab2Style: {
                            fontSize: "25px",
                            backgroundColor: "yellow"
                        },
                        api_data: []
                    })
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    this.setState({
                        responseOk: false,
                        errorMessage: error.message,
                        tab2Style: {
                            fontSize: "25px",
                            backgroundColor: "yellow"
                        },
                        api_data: []
                    })
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    // call this when the continue button is clicked after a POST
    onPostIt = () => {
        this.setState({
            responseOk: true,
            errorMessage: "",
            api_data: this.state.api_data
        })
    }

    onBodyArrayChange = (idx, value) => {
        let tempData = this.state.send_data;
        tempData[idx].fieldValue = value;
        this.setState({
            send_data: tempData
        })
    }

    displayPopulateConstances = (body_data) => {
        console.log(body_data)

        return body_data.map((columns, idx) =>
            <tr key={idx} >
                <td style={this.pStyle}>{idx + 1}</td>
                <td style={this.pStyle}>{columns.fieldName}</td>
                <td>
                    <input name={idx} defaultValue={columns.fieldValue} style={this.fStyle}
                        size="40"
                        onBlur={event => this.onBodyArrayChange(event.target.name, event.target.value)} />
                </td>
                <td style={this.pStyle}>{columns.fieldType}</td>
            </tr>)
    }

    render() {
        // Normal path for component

        return (
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                <TabList>
                    <Tab style={{ fontSize: "25px", backgroundColor: "lightblue" }}><label >Params for API Call</label></Tab>
                    <Tab style={this.state.tab2Style}>Data from API Call {this.state.errorMessage}</Tab>
                </TabList>
                <TabPanel>
                    <div style={this.pStyle}>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={this.hStyle}>
                                        <label>
                                            File Id:
                            </label>
                                    </td>
                                    <td>
                                        <input name="fileId" defaultValue={this.state.body_data.fileId} style={this.fStyle}
                                            size="50"
                                            onBlur={event => this.onTextChange('fileId', event.target.value)} />
                                    </td>
                                    <td style={this.hStyle}>Username:</td>
                                    <td>
                                        <input name="username" defaultValue={this.state.username} style={this.fStyle}
                                            size="25"
                                            onBlur={event => this.onTextChange('username', event.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={this.hStyle}>

                                    </td>
                                    <td>
                                    </td>
                                    <td style={this.hStyle}>Password:</td>
                                    <td>
                                        <input type="password" name="pwd" style={this.fStyle} size="25"
                                            defaultValue={this.state.password}
                                            onBlur={event => this.onTextChange('username', event.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <div style={{ textAlign: 'left' }}>
                            <button onClick={this.postCall} style={{ fontSize: '20px' }} >CALL API with POST</button>
                        </div>
                        <br />
                        <hr />
                        <div>
                            <table style={this.tdivStyle}>
                                <tbody>
                                    {this.displayPopulateConstances(this.state.send_data)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div>
                        <h2>Data from API - /pdf/getdata/[file ID] - {this.state.api_data.length} RECORDS</h2>
                        <ShowPdf Pdf={this.state.pdf} />
                    </div>
                </TabPanel>
            </Tabs>

        )
    }


    // <ReactPDF
    //                     file={{
    //                         data: this.state.pdf
    //                     }}
    //                 />
    // <ShowPdf Pdf={this.state.pdf} />
    // styles
    pStyle = {
        fontSize: '25px'
    };
    tStyle = {
        textAlign: "center"
    }
    fStyle = {
        fontSize: '25px',
        wdith: '200px'
    }
    hStyle = {
        width: "10%",
        fontSize: '25px',
        textAlign: 'left'
    };

    tab2Style = {
        fontSize: "25px",
        backgroundColor: "lightgreen"
    }

    tdivStyle = {
        margin: '40px',
        border: '5px solid blue'
    };
    tpStyle = {
        fontSize: '25px',
        textAlign: 'center',
        border: '1px solid blue'
    };
    thStyle = {
        fontSize: '25px',
        fontWeight: 'bold',
        textAlign: 'center',
        border: '1px solid blue'
    };
}



export default ConsumePost;