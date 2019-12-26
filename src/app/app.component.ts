import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'formcontrol';
  nameControl: FormControl;
  fullNameControl: FormGroup;
  userListControl: FormGroup;
  ngOnInit(){
    this.nameControl = new FormControl('Vasya', [validatorLength(5), requiredValidator]);
    this.nameControl.valueChanges.subscribe((value) => console.log(value));
    this.nameControl.statusChanges.subscribe((status) => {
      console.log(this.nameControl.errors);
      console.log(status);
    });

    this.fullNameControl = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl()
    })

    this.fullNameControl.valueChanges.subscribe((value) => console.log(value));

    this.userListControl = new FormGroup({
      users: new FormArray([
        new FormControl('Dima', [validatorLength(5), requiredValidator]),
        new FormControl('Marina', [validatorLength(5), requiredValidator])
      ])
    });

    this.userListControl.controls['users'].valueChanges.subscribe((value) => console.log(value));
    this.userListControl.controls['users'].statusChanges.subscribe((status) => {
      console.log(this.userListControl.controls['users'].errors);
      console.log(status);
    });

  }
  removeUserControl(index) {
    (this.userListControl.controls['users'] as FormArray).removeAt(index);
  }

  addUserControl(index) {
    (this.userListControl.controls['users'] as FormArray).push(new FormControl('', [validatorLength(5), requiredValidator]));
  }
}
function validatorLength (number) {
  return function  (formControl: FormControl) {
    if(formControl.value.length < number) {
      return { myValidator: { message: `Сообщение должно быть длиннее  ${number} символов`} };
    }
    return null;
  }
}

function requiredValidator (formControl: FormControl) {
  if(!formControl.value.length) {
    return { myValidator: { message: 'Введите сообщение'} };
  }
  return null;
}

