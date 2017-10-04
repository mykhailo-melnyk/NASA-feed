import { ActionCreator } from '../libs/ApiActions/createApiActions';
import { neoApi } from '../api';
import { NEO } from './types';

export const NeoActions = {
  getNeoFeed: new ActionCreator(NEO.GET_NEOS, neoApi.getNeoFeed),

  START_FEED_PROCESS: 'START_FEED_PROCESS',
  STOP_FEED_PROCESS: 'STOP_FEED_PROCESS',

  GET_ALL_NEOS_FOR_DAY: 'GET_ALL_NEOS_FOR_DAY',

  GO_TO_NEXT_DAY: 'GO_TO_NEXT_DAY',

  goToNextDay(payload) {
    return {
      type: this.GO_TO_NEXT_DAY,
      payload,
    };
  },

  startFeedProcess(startDate) {
    return {
      type: this.START_FEED_PROCESS,
      payload: {
        startDate,
      },
    };
  },
};
