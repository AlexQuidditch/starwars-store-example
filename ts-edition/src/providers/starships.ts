import qs, { IStringifyOptions } from 'qs';

import { StarshipsResponse } from '@/@types';

import API from '@/services/api';
import log from '@/services/log';

const qsConfig: IStringifyOptions = {
  encode: false,
};

async function load (params = {}) {
  try {
    const uri: string = '/starships';
    const q = qs.stringify(params, qsConfig);
    const url = q.length
      ? [ uri, q ].join('?')
      : uri;

    const { status, data } = await API.get<StarshipsResponse>(url);
    log('Starships/load - ', params, { status, data });
    return data;
  } catch (error) {
    console.error('Starships/load - ', error);
    throw error;
  }
}


export default {
  load,
};
