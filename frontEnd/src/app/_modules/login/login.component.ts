import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VERSION } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, AlertService } from 'src/app/_services';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
})

export class LoginComponent implements OnInit {
    //model: any = {};
    loading = false;
    returnUrl: string;
    title = 'Taller de Ciclismo';
    version = VERSION;
    form: FormGroup;
    private formSubmitAttempt: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        this.form = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    isFieldInvalid(field: string) { // {6}


        return (
            (!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt)
        );
    }

    login() {

        this.loading = true;

        if (this.form.valid) {

            this.authenticationService.login(this.form.value["userName"], this.form.value["password"])
                .subscribe(
                    data => {
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });

            this.formSubmitAttempt = true;

        }
    }
}
