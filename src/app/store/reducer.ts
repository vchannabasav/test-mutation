import { Contact } from "../contacts/model/contacts";
import * as fromAction from "./actions";
import produce from "immer";

export interface ContactState {
  contactDetails: Contact[];
}

export const initialState: ContactState = {
  contactDetails: []
};

export function reducer(
  state: ContactState = initialState,
  action: fromAction.ContactsActions
): ContactState {
  return produce(state, draftState => {
    switch (action.type) {
      case fromAction.SAVE_CONTACTS:
        draftState.contactDetails = action.payload;
        return;
    }
  });
}

export const contactDetails = (state: ContactState) => state.contactDetails;
