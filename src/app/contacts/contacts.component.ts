import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Subject, zip } from "rxjs";
import { takeUntil } from "rxjs/operators";
import * as fromContactReducer from "../store";
import * as fromContactActions from "../store/actions";
import { ContactState } from "../store/reducer";
import { Contact } from "./model/contacts";

@Component({
  selector: "contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"]
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  contactFormGroup = this.fb.group({
    phoneNumber: [null, Validators.required],
    email: [null, Validators.required]
  });
  selectedRowIndex = -1;

  contactDetails$ = this.store.select(fromContactReducer.getContactDetails);
  destroy$ = new Subject<boolean>();

  setClickedRow = index => {
    this.selectedRowIndex = index;
    this.contactFormGroup.patchValue(this.contacts[index]);
  };

  constructor(private store: Store<ContactState>, private fb: FormBuilder) {}

  ngOnInit() {
    zip(this.contactDetails$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([contacts]) => {
        this.contacts = [...contacts];
      });
  }

  submit() {
    if (this.contactFormGroup.valid) {
      this.contacts.push(this.contactFormGroup.value);
      this.contactFormGroup.reset();
      this.selectedRowIndex = -1;
    } else {
      alert("Phone number and email are required");
    }
  }

  update() {
    if (this.selectedRowIndex >= 0) {
      if (this.contactFormGroup.valid) {
        this.contacts[this.selectedRowIndex] = this.contactFormGroup.value;
        this.contactFormGroup.reset();
      } else {
        alert("Phone number and email are required");
      }
    } else {
      alert("Select a row to update");
    }
  }

  delete(index) {
    this.contacts.splice(index, 1);
    this.selectedRowIndex = -1;
    this.contactFormGroup.reset();
  }

  save() {
    this.store.dispatch(new fromContactActions.SaveContacts(this.contacts));
    this.contactFormGroup.reset();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
