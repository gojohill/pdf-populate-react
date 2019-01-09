import React from 'react';
import Values from '../Components/Values';
import axios from 'axios';

// Consume the POST API

class PDFgetdata extends React.Component {

    pStyle = {
        fontSize: '25px'
    };
    fStyle = {
        fontSize: '25px',
        wdith: '200px'
    }
    hStyle = {
        width: "10%",
        fontSize: '25px',
        textAlign: 'left'
    };
    // setup the state for the component
    state = {
        api_data: [],
        responseOk: true,
        errorMessage: "",
        responseMessage: "true",
        body_data: {
            fileId: "05975022-70fe-41cf-9e33-20507ee53001",
            includeOffBtns: true,
            includeBlankTxt: true
        },
        username: "Packman",
        password: "Packman123"
    }

    componentDidMount() {
        this.postCall();
        console.log('componentDidMount: ', this.props.api_data);
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
        console.log("in postCall")
        axios({
            method: 'post',
            url: 'http://localhost:8090/pdf/getdata',
            data: {
                //              "fileId": "05975022-70fe-41cf-9e33-20507ee53001",
                fileId: this.state.body_data.fileId,
                includeOffBtns: this.state.body_data.includeOffBtns,
                includeBlankTxt: this.state.body_data.includeBlankTxt
            },
            withCredentials: false,
            auth: {
                username: this.state.username,
                password: this.state.password
            },
        }).then((response) => {
            this.setState({
                responseOk: true,
                errorMessage: response.status,
                responseMessage: "true",
                api_data: response.data
            })
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
                        errorMessage: error.message
                    })
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    this.setState({
                        responseOk: false,
                        errorMessage: error.message
                    })
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    this.setState({
                        responseOk: false,
                        errorMessage: error.message
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

    render() {
        // if the responseOK was false - it was not OK
        if (!this.state.responseOk)
            return (
                <div>
                    <h1>Failed... {this.state.errorMessage}</h1>
                    <div style={{ textAlign: 'left' }}>
                        <button name="btnContinue"
                            onMouseDown={event => this.onPostIt()}>
                            Continue</button>
                    </div>
                </div>)
        // The repsonse was ok and  if the message is not "" then show Successful
        // if ((this.state.errorMessage !== "")) {
        //     return (
        //         <div>
        //             <h1>Post Successful... </h1>
        //             <div style={{ textAlign: 'left' }}>
        //                 <button name="btnContinue"
        //                     onMouseDown={event => this.onPostIt()}>
        //                     Continue</button>
        //             </div>
        //         </div>)
        // }

        // Normal path for component
        return (
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
                                <label>
                                    Include Off Btns:
                            </label>
                            </td>
                            <td>
                                <input type="checkbox" name="includeOffBtns"
                                    checked={this.state.body_data.includeOffBtns}
                                    onChange={event => this.onTextChange('includeOffBtns', event.target.checked)} value="OffBtns"></input>

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
                                <label>
                                    Include Blank Txt:
                            </label>
                            </td>
                            <td>
                                <input type="checkbox" name="includeBlankTxt"
                                    checked={this.state.body_data.includeBlankTxt}
                                    onChange={event => this.onTextChange('includeBlankTxt', event.target.checked)} value="BlankTxt"></input>
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
                <h2>Data from API - /pdf/getdata - {this.state.api_data.length} RECORDS</h2>
                <Values api_data={this.state.api_data} />

            </div>

        )
    }
}

export default PDFgetdata;