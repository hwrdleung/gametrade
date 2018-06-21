import { Component, OnInit } from '@angular/core';
import * as JWT from 'jwt-decode';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { passwordMatchValidator } from '../validators/passwordMatch.validator';
import { emailMatchValidator } from '../validators/emailMatch.validator';
import { passwordRequirementsValidator } from '../validators/passwordRequirements.validator';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData;

  changeLocationForm: FormGroup;
  changeEmailForm: FormGroup;
  changePasswordForm: FormGroup;
  deleteAccountForm: FormGroup;
  editProfileForm: FormGroup;

  // UI logic variables
  displayEditProfileTab = true;
  displayAccountSettingsTab = false;
  displayChangeLocationForm = false;
  displayChangeEmailForm = false;
  displayChangePasswordForm = false;
  displayDeleteAccountForm = false;
  displayPictureSelector = false;

  editBioMode = false;
  selectedImgIndex = this.dataService.userData.profile.picture;

  selectedImg = this.dataService.profilePics[this.selectedImgIndex];

  constructor(private dataService: DataService, private formBuilder: FormBuilder) {

    this.editProfileForm = formBuilder.group({
      'displayName': [this.dataService.userData.profile['display name'] ? 'Enable' : 'Disable'],
      'displayEmail': [this.dataService.userData.profile['display email'] ? 'Enable' : 'Disable'],
      'bio': [this.dataService.userData.profile.bio],
      'picture': [this.selectedImgIndex]
    });

    this.changeLocationForm = formBuilder.group({
      'newCity': [null, Validators.required],
      'newState': [null, Validators.required],
      'newCountry': [null, Validators.required]
    });

    this.changeEmailForm = formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      'email2': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
    }, { validator: emailMatchValidator });

    this.changePasswordForm = formBuilder.group({
      'oldPassword': [null, Validators.required],
      'password': [null, Validators.required],
      'password2': [null, Validators.required]
    }, { validator: [passwordMatchValidator, passwordRequirementsValidator] });

    this.deleteAccountForm = formBuilder.group({
      'password': [null, Validators.required],
    }, );

  }

  ngOnInit() {
  }

  resetView() {
    this.displayPictureSelector = false;
    this.editBioMode = false;
  }

  togglePictureSelector() {
    this.displayPictureSelector = !this.displayPictureSelector;
  }

  setPicture(index) {
    this.selectedImgIndex = index;
    this.selectedImg = this.dataService.profilePics[index];
    this.editProfileForm.value.picture = index;
  }

  toggleEditBioMode() {
    this.editBioMode = !this.editBioMode;
  }

  displayContent(tab) {
    this.displayEditProfileTab = false;
    this.displayAccountSettingsTab = false;

    switch (tab) {
      case 'Edit Profile':
        this.displayEditProfileTab = true;
        break;
      case 'Account Settings':
        this.displayAccountSettingsTab = true;
        break;
    }
  }

  displayForm(form) {
    switch (form) {
      case 'location':
        this.displayChangeLocationForm = !this.displayChangeLocationForm;
        this.displayChangeEmailForm = false;
        this.displayChangePasswordForm = false;
        this.displayDeleteAccountForm = false;
        break;
      case 'email':
        this.displayChangeEmailForm = !this.displayChangeEmailForm;
        this.displayChangeLocationForm = false;
        this.displayChangePasswordForm = false;
        this.displayDeleteAccountForm = false;
        break;
      case 'password':
        this.displayChangePasswordForm = !this.displayChangePasswordForm;
        this.displayChangeLocationForm = false;
        this.displayChangeEmailForm = false;
        this.displayDeleteAccountForm = false;
        break;
      case 'delete account':
        this.displayChangePasswordForm = false;
        this.displayChangeLocationForm = false;
        this.displayChangeEmailForm = false;
        this.displayDeleteAccountForm = !this.displayDeleteAccountForm;
        break;
    }
  }
}
