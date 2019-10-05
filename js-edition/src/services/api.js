import axios from 'axios';

import EnvironmentService from './environment';


class Api {
  constructor () {
    this.agent = axios.create({
      baseURL: `${EnvironmentService.CurrentAPI}`,
    });

    this.agent.interceptors.request.use((config) => config, (error) => {
      console.error('REQUEST error -', error.response);
      throw error;
    });

    this.agent.interceptors.response.use((response) => response, (error) => {
      if (error) {
        if (error.response) {
          console.error('RESPONSE error -', error.response);
          throw error.response;
        }
        throw error;
      } else {
        console.error('! Неизвестная ошибка API !');
      }
    });
  }

  get (url, config) {
    return this.agent.get(url, config);
  }

  remove (url, config) {
    return this.agent.delete(url, config);
  }

  post (url, payload, config) {
    return this.agent.post(url, payload, config);
  }

  put (url, payload, config) {
    return this.agent.put(url, payload, config);
  }

  patch (url, payload, config) {
    return this.agent.patch(url, payload, config);
  }
}

const API = new Api();

export default API;
