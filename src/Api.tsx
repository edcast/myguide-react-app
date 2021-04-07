import axios from 'axios';

export const userSignIn = (data :any,callback : any): void => {

    console.log("Api event");
    let headers = {
        'Content-Type': 'application/json',
        "appkey": process.env.REACT_APP_API_KEY
    };

    axios.post(process.env.WEB_API_URL+"user/signin",data,{headers:headers})
        .then((response) => {
            console.log("response", response);
            if(response.data.code === 1000){
                callback(response.data.data);
            }
        })
        .catch((error) => {
            console.log("error", error);
        });

};