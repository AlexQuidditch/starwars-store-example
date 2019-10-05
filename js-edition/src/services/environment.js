// прописано в .env-файлах
const {
  BASE_URL,
  NODE_ENV,
  VUE_APP_API_URL,
  VUE_APP_PROJECT,
} = process.env;

class Environment {
  constructor () {
    this.DEVELOPMENT = 'development';
    this.PRODUCTION = 'production';
    this.BASE_URL = BASE_URL || '';
    this.NODE_ENV = NODE_ENV || '';
    this.VUE_APP_API_URL = VUE_APP_API_URL || '';
    this.VUE_APP_PROJECT = VUE_APP_PROJECT || '';
  }

  get CurrentProject () {
    return this.VUE_APP_PROJECT || '';
  }

  get isDevelopment () {
    return [this.DEVELOPMENT].includes(this.NODE_ENV);
  }

  get isProduction () {
    return this.NODE_ENV === this.PRODUCTION;
  }

  get baseUrl () {
    return this.BASE_URL;
  }

  get CurrentAPI () {
    return this.CurrentEnvironmentAPI;
  }

  get CurrentEnvironmentAPI () {
    return this.VUE_APP_API_URL;
  }
}

const EnvironmentService = new Environment();

export default EnvironmentService;
