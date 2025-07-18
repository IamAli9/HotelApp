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
    let result =this.http.get<Reservation[]>(this.baseApiUrl + '/reservations');
    console.log('Getting Reservations :' + JSON.stringify(result));
    return result;
  }

  getReservationById(id:string): Reservation | undefined{
    let reservation = this.reservations.find(res => res.id === id);
    console.log('Getting Reservation By Id :' + JSON.stringify(this.reservations))
    return reservation;
  }

  addReservation(reservation: Reservation): void {
    reservation.id =  Date.now().toString();
    this.reservations.push(reservation);
  
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);
  
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === id);
    if (index !== -1) {
      updatedReservation.id = id;
      this.reservations[index] = updatedReservation;
      
    }
  }
}
