import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formFields: any = [
    { name: 'fname', type: 'text', label: 'First Name', value: '', validators: [Validators.required] },
    { name: 'lname', type: 'text', label: 'Last Name', value: '', validators: [Validators.required] },
    { name: 'email', type: 'email', label: 'Email', value: '' },
    { name: 'mobile', type: 'text', label: 'Mobile', value: '' },
    { name: 'img', type: 'file', label: 'Image', value: '', multi: false, validators: [Validators.required] },
  ];
  form: any = {};
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let formObj: any = {};
    this.formFields.forEach((element: any) => {
      this.form[element.name] = element.value;
      formObj[element.name] = ['', element.validators];
    });
    this.registerForm = this.formBuilder.group(formObj);
  }
  get f() { return this.registerForm.controls; }
  handleSubmit = () => {
    this.submitted = true;
    console.log(this.form);


  }
  onChange(id: any) {
    const inputNode: any = document.querySelector(`#${id}`);
    let file: any = inputNode.files;
    if (file.length > 1)
      file = inputNode.files;
    else
      file = inputNode.files[0];
    this.form[id] = file;

  }

}
