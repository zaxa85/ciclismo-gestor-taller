import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild, Input  } from '@angular/core';
import {
    MatSidenav
} from '@angular/material';

@Component({
    templateUrl: 'navbar.component.html',
    selector: 'ct-navbar',
    styleUrls: ['navbar.component.css'],
})
export class NavbarComponent {
    @ViewChild('snav', {static: false}) public sidenav: MatSidenav;
    imageUrl = '';

    isIn = false;   // store state
    isLogged = false;
    userFullName = '';
    userType = '';
    isAdmin = false;

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;

    constructor(changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

    }
    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
    }

    ngDoCheck() {
        if (localStorage.getItem('currentUser')) {
            this.isLogged = true;
            var loginUser = JSON.parse(localStorage.getItem('currentUser'));
            var role = localStorage.getItem('userRoles');

            this.userFullName = loginUser.username;
            this.userType = role;
            this.isAdmin = (role === "admin") ? true : false;
        } else {
            this.isLogged = false;
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        
        this.router.navigate(['/login']);
        this.isLogged = false;
        this.sidenav.close();
    }

    roleMatch(allowedRoles): boolean {
        var isMatch = false;
        var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
        allowedRoles.forEach(element => {
            if (userRoles.indexOf(element) > -1) {
                isMatch = true;
                return false;
            }
        });
        return isMatch;

    }


    sendToRoute(sRoute: string, isMobile: boolean) {
        if (isMobile) {
            this.sidenav.close();
            this.router.navigate([sRoute]);
        }
    }
}