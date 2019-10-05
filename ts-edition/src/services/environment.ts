// прописано в .env-файлах
const {
  BASE_URL,
  NODE_ENV,
  VUE_APP_API_URL,
  VUE_APP_PROJECT,
} = process.env;

class Environment {
  protected readonly DEVELOPMENT: string;
  protected readonly PRODUCTION: string;
  protected readonly NODE_ENV: string;
  protected readonly VUE_APP_API_URL: string;
  protected readonly VUE_APP_PROJECT: string;
  protected readonly BASE_URL: string;

  constructor () {
    this.DEVELOPMENT = 'development';
    this.PRODUCTION = 'production';
    this.BASE_URL = BASE_URL || '';
    this.NODE_ENV = NODE_ENV || '';
    this.VUE_APP_API_URL = VUE_APP_API_URL || '';
    this.VUE_APP_PROJECT = VUE_APP_PROJECT || '';
  }

  public get CurrentProject (): string {
    return this.VUE_APP_PROJECT || '';
  }

  public get isDevelopment (): boolean {
    return [this.DEVELOPMENT].includes(this.NODE_ENV);
  }

  public get isProduction (): boolean {
    return this.NODE_ENV === this.PRODUCTION;
  }

  public get baseUrl (): string {
    return this.BASE_URL;
  }

  public get CurrentAPI (): string {
    return this.CurrentEnvironmentAPI;
  }

  protected get CurrentEnvironmentAPI (): string {
    return this.VUE_APP_API_URL;
  }
}

const EnvironmentService = new Environment();

export default EnvironmentService;
