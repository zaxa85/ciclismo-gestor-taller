import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StorageService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    postFile(fileToUpload: File, location: string): Observable<boolean> {
        const endpoint = this.API_URL + '/api/containers/' + location + '/upload';
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return<any>this.http.post(endpoint, formData); 
    }

}