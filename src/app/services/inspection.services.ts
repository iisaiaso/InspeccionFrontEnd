import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httOption = {
    headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
    })
}

@Injectable({ providedIn: 'root' })

export class InspectionService {

    private urlInspection: string = environment.url

    constructor(private http: HttpClient) { }

    // Show inspection
    getInspection(): Observable<any[]> {
        return this.http.get<any[]>(this.urlInspection + 'Inspection')
    }

    // Show inspection of id
    getInspectionId(id: number) {
        return this.http.get(this.urlInspection + `Inspection/${id}`)
    }

    // Add inspection
    addInspection(data: any) {
        return this.http.post(this.urlInspection + 'Inspection', data);
    }

    // Update inspection
    updateInspection(id: number, data: any) {

        return this.http.put(this.urlInspection + `Inspection/${id}`, data)
    }

    // Delete inspection
    deleteInspection(id: number) {

        return this.http.delete(this.urlInspection + `Inspection/${id}`)
    }

    //   ***************************** Inspection type *************************************

    // Show inspection type
    getInspectionType(): Observable<any[]> {
        return this.http.get<any[]>(this.urlInspection + 'InspectionType')
    }

    // Show inspection type of id
    getInspectionTypeId(id: number) {
        return this.http.get(this.urlInspection + `InspectionType/${id}`)
    }

    // Add inspection type
    addInspectionType(data: any) {
        return this.http.post(this.urlInspection + 'InspectionType', data);
    }

    // Update inspection type
    updateInspectionType(id: number, data: any) {

        return this.http.put(this.urlInspection + `InspectionType/${id}`, data)
    }

    // Delete inspection type
    deleteInspectionType(id: number) {

        return this.http.delete(this.urlInspection + `InspectionType/${id}`)
    }

    //   *********************************** Status *******************************

    // Show status
    getStatus(): Observable<any[]> {
        return this.http.get<any[]>(this.urlInspection + 'Status')
    }

    // Show status of id
    getStatusId(id: number) {
        return this.http.get(this.urlInspection + `Status/${id}`)
    }

    // Add status
    addStatus(data: any) {
        return this.http.post(this.urlInspection + 'Status', data);
    }

    // Update status
    updateStatus(id: number, data: any) {

        return this.http.put(this.urlInspection + `Status/${id}`, data)
    }

    // Delete status
    deleteStatus(id: number) {

        return this.http.delete(this.urlInspection + `Status/${id}`)
    }
} 