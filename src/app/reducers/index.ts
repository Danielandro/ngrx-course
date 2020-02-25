import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer // reducer to handle actions dispatched for this state
};

// Metareducer
// gets executed before normal reducer
// Argument: Reducer -> Returns: Reducer
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  // as a reducer, it recieves state & action
  return (state, action) => {
    // return reducer with the state and action
    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
