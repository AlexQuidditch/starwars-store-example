/* eslint-disable no-shadow */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

import { IStringifyOptions, stringify } from 'qs';

export const GET = 'get';
export const PUT = 'put';
export const POST = 'post';
export const PATCH = 'patch';
export const REMOVE = 'remove';

export type RequestConfig = AxiosRequestConfig
export type ResponseData<T = unknown> = AxiosResponse<T>
export type ErrorData<T = unknown> = AxiosError<T>

export const httpHeaders = {
  acceptHeader: 'accept',
  acceptCharsetHeader: 'accept-charset',
  acceptEncodingHeader: 'accept-encoding',
  acceptLanguageHeader: 'accept-language',
  acceptRangesHeader: 'accept-ranges',
  ageHeader: 'age',
  allowHeader: 'allow',
  authorizationHeader: 'authorization',
  cacheControlHeader: 'cache-control',
  connectionHeader: 'connection',
  contentEncodingHeader: 'content-encoding',
  contentLanguageHeader: 'content-language',
  contentLengthHeader: 'content-length',
  contentLocationHeader: 'content-location',
  contentMD5Header: 'content-md5',
  contentRangeHeader: 'content-range',
  contentTypeHeader: 'content-type',
  dateHeader: 'date',
  etagHeader: 'etag',
  expectHeader: 'expect',
  expiresHeader: 'expires',
  fromHeader: 'from',
  hostHeader: 'host',
  ifMatchHeader: 'if-match',
  ifModifiedSinceHeader: 'if-modified-since',
  ifNoneMatchHeader: 'if-none-match',
  ifRangeHeader: 'if-range',
  ifUnmodifiedSinceHeader: 'if-unmodified-since',
  lastModifiedHeader: 'last-modified',
  locationHeader: 'location',
  maxForwardsHeader: 'max-forwards',
  pragmaHeader: 'pragma',
  proxyAuthenticateHeader: 'proxy-authenticate',
  proxyAuthorizationHeader: 'proxy-authorization',
  rangeHeader: 'range',
  refererHeader: 'referer',
  retryAfterHeader: 'retry-after',
  serverHeader: 'server',
  teHeader: 'te',
  trailerHeader: 'trailer',
  transferEncodingHeader: 'transfer-encoding',
  upgradeHeader: 'upgrade',
  userAgentHeader: 'user-agent',
  varyHeader: 'vary',
  viaHeader: 'via',
  warningHeader: 'warning',
  wwwAuthenticateHeader: 'www-authenticate',
};

export function setProviderLanguage(locale: string) {
  axios.defaults.headers.common[httpHeaders.acceptLanguageHeader] = locale;
}

export function baseTransformRequestConfig(config: RequestConfig) {
  return config;
}

export function baseTransformRequestError(error: ErrorData<unknown>) {
  console.error(error.response);
  throw error.response;
}

export function baseTransformResponseConfig(response: ResponseData<unknown>) {
  return response;
}

export async function baseTransformResponseError({ config, response }: ErrorData<any>) {
  console.dir(config, { depth: 10 });
  console.log({ response: response?.data });
  throw response;
}

export class BaseRestProvider {
  private readonly agent: AxiosInstance

  private readonly queryOptions: IStringifyOptions;

  public constructor(
    baseURL: string,
    transformRequestConfig?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    transformRequestError?: (error: AxiosError<unknown>) => unknown,
    transformResponseConfig?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    transformResponseError?: (error: any) => unknown,
  ) {
    this.agent = axios.create({
      baseURL,
      responseType: 'json',
    });

    this.queryOptions = {
      arrayFormat: 'brackets',
      charset: 'utf-8',
    };

    this.agent.interceptors.request.use(
      transformRequestConfig ?? baseTransformRequestConfig,
      transformRequestError ?? baseTransformRequestError,
    );

    this.agent.interceptors.response.use(
      transformResponseConfig ?? baseTransformResponseConfig,
      transformResponseError ?? baseTransformResponseError,
    );

    console.info('Provider for', baseURL, 'created at', new Date().toISOString());
  }

  // eslint-disable-next-line class-methods-use-this
  public getCancelToken() {
    return axios.CancelToken.source();
  }

  protected getUrlWithParams(url: string, params: any) {
    const query = this.stringifyQuery(params);
    const result = [url, query].join('?');
    return result.length > 1 ? result : '';
  }

  protected [GET]<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return this.agent.get<T>(url, config);
  }

  protected [REMOVE]<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return this.agent.delete<T>(url, config);
  }

  protected [POST]<T = unknown>(url: string, payload?: unknown, config?: AxiosRequestConfig) {
    return this.agent.post<T>(url, payload, config);
  }

  protected [PUT]<T = unknown>(url: string, payload?: unknown, config?: AxiosRequestConfig) {
    return this.agent.put<T>(url, payload, config);
  }

  protected [PATCH]<T = unknown>(url: string, payload?: unknown, config?: AxiosRequestConfig) {
    return this.agent.patch<T>(url, payload, config);
  }

  private stringifyQuery(obj: any): string {
    return stringify(obj, this.queryOptions);
  }
}
