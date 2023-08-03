import axios from "axios";


class Topics {

  list(succsess_callback, error_callback){
    axios.get(`${process.env.REACT_APP_API_URL}/api/topics`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, 
      withCredentials: true 
    })
      .then(function (response) {
        succsess_callback(response)
      })
      .catch(function (error) {
        error_callback(error.response.data);
      });

  }
  

}

const topics = new Topics();

export default topics;