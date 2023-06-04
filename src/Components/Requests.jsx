import axios from "axios";

const serverRequest = ({ route, headers, data }) => {


    let url;
    if (window.location.hostname === "localhost") {
        url = "http://localhost:8080/" + route;
    } else {
        url = "https://gilliamsserver.herokuapp.com/" + route;
    }

    return axios.get(url, {})
        .then(res => {
            return res; // Return the entire response object
        })
        .catch(err => {
            console.log("ERROR HERE " + err);
            throw err;
        });

}

export default serverRequest;