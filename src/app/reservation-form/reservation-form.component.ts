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
    debugger
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
        let reservation = this.reservationService.getReservationById(id);
        console.log('NGONIT id preservation check : '+ JSON.stringify(reservation) )
        if(reservation)
          this.reservationForm.patchValue(reservation);
    }

  }

  onSubmit()
  {
    if (this.reservationForm.valid) {
      let reservation : Reservation = this.reservationForm.value;
    
      let id = this.activatedRoute.snapshot.paramMap.get('id')
      if(id)
      {
        console.log('Updating Reservation : ' + JSON.stringify(reservation))
        this.reservationService.updateReservation(id,reservation)
      }
      else
      {
        this.reservationService.addReservation(reservation);
      }    
      this.router.navigate(['/list']);
    }
  }

}
