import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private approvalMessage = new BehaviorSubject(
    ''
  );
  currentMessage = this.approvalMessage.asObservable();
  constructor() {}
  updateMessage(message: any) {
    this.approvalMessage.next(message);
  }
}
