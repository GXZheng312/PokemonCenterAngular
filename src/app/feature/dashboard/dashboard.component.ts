import { CommonModule } from '@angular/common';
import { TrainerService } from '../../core/services/firestore/trainer.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'feature-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  trainerService = inject(TrainerService);

  async ngOnInit() {
    this.trainerService.getTrainers().subscribe((trainers) => {
      console.log(trainers);
    });
  }

}
