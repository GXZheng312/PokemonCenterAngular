import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private firestore = inject(Firestore);
  private collectionPath = 'trainers';

  trainersCollection = collection(this.firestore, this.collectionPath);

  getTrainers() : Observable<any[]> {
    return collectionData(this.trainersCollection, { 
      idField: 'id' 
    }) as Observable<any[]>;
  }
}
