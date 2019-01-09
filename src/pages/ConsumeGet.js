import React from "react";

/**
 * ConsumeGet - displays the results from the API on a get
 * 
 * @param { api_data } param0 - data from the fetch to the API 
 */
const ConsumeGet = ({ api_data }) => {

    //map the api_data to be displayed 
    const showColumns =
        api_data.map((columns, idx) =>
            <tr key={idx} >
                <td style={pStyle}>{idx + 1}</td>
                <td style={pStyle}>{columns.fieldName}</td>
                <td style={pStyle}>{columns.fieldValue}</td>
                <td style={pStyle}>{columns.fieldType}</td>
            </tr>)

    // return the page for the api data fetch
    return (
        <div>
            <div>
                <table style={divStyle}>
                    <thead>
                        <tr style={divStyle}>
                            <td style={hStyle}>Row Number</td>
                            <td style={hStyle}>Field Name</td>
                            <td style={hStyle}>Field Value</td>
                            <td style={hStyle}>Field Type</td>
                        </tr>
                    </thead>
                    <tbody>
                    {showColumns}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// {showColumns}
// Styles
const divStyle = {
    margin: '40px',
    border: '5px solid blue'
};
const pStyle = {
    fontSize: '25px',
    textAlign: 'center',
    border: '1px solid blue'
};
const hStyle = {
    fontSize: '25px',
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid blue'
};

export default ConsumeGet;