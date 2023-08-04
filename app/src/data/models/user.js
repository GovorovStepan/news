import axios from "axios";


class User {
  registrate(params, succsess_callback, error_callback) {
    axios.post(`${process.env.REACT_APP_API_URL}/api/register`, params, {
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

  login(params, succsess_callback, error_callback) {
    axios.post(`${process.env.REACT_APP_API_URL}/api/login`, params, {
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
  logout(params) {
    axios.post(`${process.env.REACT_APP_API_URL}/api/logout`, params, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    })
      .then(function (response) {

      })
      .catch(function (error) {
        console.error(error)
      });

  }

  async get(succsess_callback, error_callback) {

    await axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    })
      .then(function (response) {
        succsess_callback(response.data.data)
      })
      .catch(function (error) {
        console.error(error)
        error_callback();
      });
  }
}

const user = new User();

export default user;