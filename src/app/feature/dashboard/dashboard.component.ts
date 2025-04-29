import { CommonModule } from '@angular/common';
import { TrainerService } from '../../core/services/firestore/trainer.service';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'feature-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  trainerService = inject(TrainerService);
  authService = inject(AuthService);

  user = this.authService.user;

  async ngOnInit() {
    this.trainerService.getTrainers().subscribe((trainers) => {
      console.log(trainers);
    });
  }

}
