import React from 'react';
import Values from '../Components/Values';
var axios = require('axios');

// Consume the DELETE API

class ConsumeDelete extends React.Component {

    // setup the state for use by the component
    state = {
        api_data: {
            id: 0,
            message: "",
            messageName: ""
        },
        responseOk: true,
        errorMessage: "",
        status: ""
    }

    // when text is changed this is called
    onTextChange = (value) => {
        this.setState({
            api_data: {
                id: value,
                message: this.state.api_data.name,
                messageName: this.state.api_data.messageName
            }
        })
    }

    // when the button is pressed this is called
    deleteCall = () => {
        axios.delete('http://localhost:8080/chat/'+this.state.api_data.id, this.state.api_data)
            .then((response) => {
                this.setState({
                    responseOk: true,
                    errorMessage: response.statusText+" "+response.status,
                    status: response.status
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
                        errorMessage: error.message,
                        status: error.response.status
                    })
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    this.setState({
                        responseOk: false,
                        errorMessage: error.message,
                        status: error.response.status
                    })
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    this.setState({
                        responseOk: false,
                        errorMessage: error.message,
                        status: error.response.status
                    })
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    // after the call this is called to continue when the continue button is pressed
    onPostIt = () => {
        this.setState({
            responseOk: true,
            errorMessage: ""
        })
    }

    render() {
        // if the responseOk was not true
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
                    <h1>Delete Successful... </h1>
                    <div style={{ textAlign: 'left' }}>
                        <button name="btnContinue"
                            onMouseDown={event => this.onPostIt()}>
                            Continue</button>
                    </div>
                </div>)
        }
        // main JSX
        return (
            <div>
                <label>
                    Enter Message Id:
                        <input name="messageId"
                        onBlur={event => this.onTextChange(event.target.value)} />
                </label>
                <br/><br/>
                <div style={{ textAlign: 'left' }}>
                    <button onClick={this.deleteCall} >CALL API with DELETE</button>
                </div>
                <br />
                <hr />
                <h2>Current Messages in Application</h2>
                <Values />
            </div>
        )
    }
}

export default ConsumeDelete;