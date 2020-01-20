import { Action } from "@ngrx/store";
import { Contact } from "../contacts/model/contacts";

export const SAVE_CONTACTS = "[Contacts] Save Contacts";

export class SaveContacts implements Action {
  readonly type = SAVE_CONTACTS;
  constructor(public payload: Contact[]) {}
}

export type ContactsActions = SaveContacts;
