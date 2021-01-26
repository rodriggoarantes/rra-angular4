import { Injectable } from '@angular/core';

import { SuggestedStoreService } from '@app/stores/suggested-store.service';

@Injectable({
  providedIn: 'root',
})
export class ClearService {
  constructor(private suggestedStore: SuggestedStoreService) {}

  public execute() {
    this.suggestedStore.clear();
  }
}
