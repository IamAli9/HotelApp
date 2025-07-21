import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  reservationForm : FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, 
    private reservationService:ReservationService,
    private router:Router,
    private activatedRoute: ActivatedRoute) {
  
  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      roomNumber: ['', [Validators.required, Validators.min(1)]]
    });
    
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id)
    {
       this.reservationService.getReservationById(id).subscribe(
          reservation => {
            if(reservation)
              this.reservationForm.patchValue(reservation);
          }
        );
    }

  }

  onSubmit()
  {
    if (this.reservationForm.valid) {
      let reservation : Reservation = this.reservationForm.value;
    
      let id = this.activatedRoute.snapshot.paramMap.get('id')
      if(id) 
      { 
        this.reservationService.updateReservation(id,reservation).subscribe(()=>{
          console.log('Reservation updated successfully.');
        });
      }
      else
      {
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log('New reservation added successfully.');
        });
      }    
      this.router.navigate(['/list']);
    }
  }

}
