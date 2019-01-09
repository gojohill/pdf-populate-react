import React from 'react';
import * as api from '../utils/api';
import ConsumeGet from '../pages/ConsumeGet';

// used to get the data from the API and then display the get
class Values extends React.Component {
    state = {
        values: []
    };

    // Call the API with a Get
    callValues = () => {
        // api.fetchValues().then(response => {
        //     console.log('callValues: ', response);
        //     this.setState(() => {
        //         return {
        //             api_data: response
        //         };
        //     });
        //     console.log('after SetState: ', this.state.api_data);
        // });
    };

    // called when the component Did Mount
    componentDidMount() {
        this.callValues();
        console.log('componentDidMount: ', this.props.api_data);
    }

    render() {
        // if api_data is null then display Loading....
        if (this.props.api_data.length === 0) return <div></div>

        return <div><ConsumeGet api_data={this.props.api_data} /></div>;
    }
}

export default Values;