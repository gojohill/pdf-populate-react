import React from 'react';
import Values from '../Components/Values';
var axios = require('axios');

// Consume the POST API

class ConsumePost extends React.Component {
    // setup the state for the component
    state = {
        api_data: {
            message: "",
            messageName: ""
        },
        responseOk: true,
        errorMessage: "",
        responseMessage: "true"
    }

    // when data in a field is changed the state is updated
    onTextChange = (fieldName, value) => {
        console.log("in here" + fieldName + " " + value)
        switch (fieldName) {
            case "messageName":
                console.log("in messageName case")
                this.setState({
                    api_data: {
                        message: this.state.api_data.name,
                        messageName: value
                    }
                })
                break;
            case "message":
                this.setState({
                    api_data: {
                        message: value,
                        messageName: this.state.api_data.messageName
                    }
                })
                break;
            default:
                break;
        }
    }

    // call the API with a POST
    postCall = () => {
        console.log(this.state.api_data)
        axios.post('http://localhost:8080/chat', this.state.api_data)
            .then((response) => {
                this.setState({
                    responseOk: true,
                    errorMessage: response.status,
                    responseMessage: "true"
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
            errorMessage: ""
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
        if ((this.state.errorMessage !== "")) {
            return (
                <div>
                    <h1>Post Successful... </h1>
                    <div style={{ textAlign: 'left' }}>
                        <button name="btnContinue"
                            onMouseDown={event => this.onPostIt()}>
                            Continue</button>
                    </div>
                </div>)
        }

        // Normal path for component
        return (
            <div>
                <label>
                    Message Name:
                        <input name="messageName"
                        onBlur={event => this.onTextChange('messageName', event.target.value)} />
                </label>
                <label>
                    Message:
                        <input name="message"
                        onChange={event => this.onTextChange('message', event.target.value)} />
                </label>
                <br /><br />
                <div style={{ textAlign: 'left' }}>
                    <button onClick={this.postCall} >CALL API with POST</button>
                </div>
                <br />
                <hr />
                <h2>Current Messages in Application</h2>
                <Values />
            </div>
        )
    }
}

export default ConsumePost;