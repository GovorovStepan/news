import axios from "axios";


class Sources {

  list(succsess_callback, error_callback){
    axios.get(`${process.env.REACT_APP_API_URL}/api/sources`, {
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

const sources = new Sources();

export default sources;