import { parse } from 'qs';

import { Maybe, Starship, StarshipsResponse } from '@/types';

import log from '@/services/log';

import { environment } from '@/services';

import {
  BaseRestProvider,
  GET,
} from './base';

const routes = {
  starships: '/starships',
}

class StarshipsProvider extends BaseRestProvider {
  public constructor() {
    super(
      environment.CurrentAPI,
    );
  }

  public async getPage(params: Record<string, Maybe<string>> = {}) {
    const uri = super.getUrlWithParams(routes.starships, params)

    try {
      const { status, data } = await super[GET]<StarshipsResponse>(uri, params);
      log('StarshipsProvider/getList - ', params, { status, data });
      return data;
    } catch (error) {
      console.error('StarshipsProvider/getList - ', error);
      throw error;
    }
  }

  public async getEveryPage() {
    let params: Maybe<Record<string, Maybe<string>>> = {};
    const result: Starship[] = [];

    const $provider = this;

    async function loader (query: Record<string, Maybe<string>>) {
      const { next, results } = await  $provider.getPage(query);

      params = next
        ? parse(next.split('?')[1]) as Record<string, string>
        : null;

      result.push(...results);

      if (params && params.page) await loader(params);
      else { return false; }
    }

    await loader(params);

    return result;
  }
}

export const starshipsProvider = new StarshipsProvider();
