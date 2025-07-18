import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation'; 

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations : Reservation[] = [];

  constructor() {
    let savedReservation = localStorage.getItem('reservations');
    this.reservations = savedReservation ? JSON.parse(savedReservation) : [];
   }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservationById(id:string): Reservation | undefined{
    let reservation = this.reservations.find(res => res.id === id);
    console.log('Getting Reservation By Id :' + JSON.stringify(this.reservations))
    return reservation;
  }

  addReservation(reservation: Reservation): void {
    reservation.id =  Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);
    localStorage.setItem('reservations',JSON.stringify(this.reservations));
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === id);
    if (index !== -1) {
      updatedReservation.id = id;
      this.reservations[index] = updatedReservation;
      localStorage.setItem('reservations', JSON.stringify(this.reservations)); 
    }
  }
}
