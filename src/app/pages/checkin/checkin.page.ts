import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HuespedService } from 'src/app/services/huesped.service';
import { Huesped } from 'src/app/models/huesped';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {
  public token: string;
  public allowed = false;
  public huesped: Huesped = new Huesped();
  public hoy:string;
  public checkin: string;
  public clave: number;

  constructor(private auth:AuthenticationService, private huespedService:HuespedService) {
      this.token = window.localStorage.getItem('token');

   }

  ngOnInit() {
    this.huespedService.getHuespedes().subscribe(() =>{
      this.token = window.localStorage.getItem('token');
      this.huesped = this.huespedService.getHuespedToken(this.token);
      this.clave = this.huespedService.getClaveHabitacion(this.token);
      this.formatDate();
      this.validateCheckIn();
    })
  }

  validateCheckIn(){
    console.log(this.huesped.fecha_ingreso);
    console.log(this.huesped.fecha_salida);
    console.log(this.hoy);
    console.log(this.hoy < this.huesped.fecha_ingreso);
    console.log(this.hoy > this.huesped.fecha_salida);
    this.checkin = this.huesped.fecha_ingreso;
    if(this.hoy < this.huesped.fecha_ingreso || this.hoy > this.huesped.fecha_salida){
      this.allowed = false;
      console.log("DENEGADO")
    } else{
      this.allowed = true;
      console.log("PERMITIDO")
    }
  }

  formatDate() {
    const now = new Date;
    const dd = now.getDate();
    const mm = now.getMonth()+1;
    let yyyy = now.getFullYear()+'';
    let day = dd+'';
    let month = mm+'';
    if(dd<10){
      day = '0'+dd;
    } else 
    console.log(day);
    
    if(mm<10){
      month = '0'+mm;
    }
    this.hoy = yyyy+'-'+mm+'-'+day;
  }

}
