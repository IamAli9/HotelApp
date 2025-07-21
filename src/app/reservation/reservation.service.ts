import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseApiUrl = 'http://localhost:3001'; 
  private reservations : Reservation[] = [];

  constructor(private http: HttpClient) {
   
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.baseApiUrl + '/reservations');
  }

  getReservationById(id:string): Observable<Reservation> {
    return this.http.get<Reservation>(this.baseApiUrl + '/reservation/' + id);
  }

  addReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(this.baseApiUrl + '/reservation', reservation);
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(this.baseApiUrl +'/reservation/'+id);
  }

  updateReservation(id: string, updatedReservation: Reservation): Observable<void> {
    return this.http.put<void>(this.baseApiUrl + '/reservation/' + id, updatedReservation);
  }
}
