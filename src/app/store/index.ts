import * as fromContactReducer from "./reducer";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

export interface State {
  contactsState: fromContactReducer.ContactState;
}

export const reducers: ActionReducerMap<State> = {
  contactsState: fromContactReducer.reducer
};

export const contactState = createFeatureSelector("contactsState");
export const getContactDetails = createSelector(
  contactState,
  fromContactReducer.contactDetails
);
