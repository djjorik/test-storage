import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css']
})
export class LayoutComponent implements OnInit {
    public sidebarCollapsed = true;
    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit() {

    }

    onNotify(sidebarCollapsed: boolean): void {
        this.sidebarCollapsed = sidebarCollapsed;
    }
}