import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class ReactiveComponentCore implements OnDestroy {
  private _destroy$: Subject<void>;

  public get destroy$(): Subject<void> {
    if (!this._destroy$) {
      this._destroy$ = new Subject();
    }
    return this._destroy$;
  }

  ngOnDestroy(): void {
    if (this._destroy$) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }
}
