import axios from "axios";


class Articles {

  pageSize = process.env.REACT_APP_API_PAGE_SIZE

  search(params, succsess_callback, error_callback){
    params.pageSize = this.pageSize
    axios.post(`${process.env.REACT_APP_API_URL}/api/articles`, params, {
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
  feed(page, succsess_callback, error_callback){
    const params = {
      pageSize : this.pageSize,
      page : page
    }
    axios.post(`${process.env.REACT_APP_API_URL}/api/feed`, params, {
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

  get_by_id(id, succsess_callback, error_callback){ 
    axios.get(`${process.env.REACT_APP_API_URL}/api/articles/${id}`, {
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

const articles = new Articles();

export default articles;