import axios from "axios";


class Preferences {


  topics(succsess_callback, error_callback) {
    axios.get(`${process.env.REACT_APP_API_URL}/api/preferences/topics`, {
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

  sources(succsess_callback, error_callback) {
    axios.get(`${process.env.REACT_APP_API_URL}/api/preferences/sources`, {
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


  set(params, succsess_callback, error_callback) {
    axios.post(`${process.env.REACT_APP_API_URL}/api/preferences/set`, params, {
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

const preferences = new Preferences();

export default preferences;