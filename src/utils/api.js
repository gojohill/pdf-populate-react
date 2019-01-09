var axios = require('axios');

// used to call the api with a get
module.exports = {
    fetchValues: function() {
        var encodedURI = window.encodeURI('http://localhost:8080/chat');
        return axios.get(encodedURI).then(response => {
            console.log('fetchValues: ', response.data);
            return response.data;
        });
    }
};