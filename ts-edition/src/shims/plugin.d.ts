import { VueBus } from 'vue-bus/types';
import { Store } from 'vuex/types';

import { RootState } from '@/@types/store';

declare module 'vue/types/vue' {
  interface Vue {
    $console: Console | void;
    isProduction: boolean;
    $bus: VueBus;
    // @ts-ignore
    $store: Store<RootState>;
  }
}
