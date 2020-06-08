import { Injectable } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export const EmailValidation = new FormControl(
  "",
  Validators.compose([
    Validators.required,
    Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,5}$")
  ])
);
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(12)
];

export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (
      control &&
      control.parent.get("password").value !==
      control.parent.get("confirmPassword").value &&
      control.dirty
    );
  }
}
export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.confirmPassword.value;

  return password === passwordConfirmation ? null : { passwordsNotEqual: true };
}
