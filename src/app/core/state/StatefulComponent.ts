import { BehaviorSubject, Observable } from 'rxjs';
import { ReactiveComponentCore } from './ReactiveComponentCore';

export abstract class StatefulComponent<T extends {}> extends ReactiveComponentCore {
  public readonly state$: Observable<T>;
  private readonly _state$: BehaviorSubject<T>;

  constructor() {
    super();
    this._state$ = new BehaviorSubject<T>(<T>{});
    this.state$ = this._state$.asObservable();
  }

  public get state(): T {
    return this._state$.value;
  }

  protected setState(newState: T): void {
    this._state$.next(newState);
  }

  protected updateState(newState: Partial<T>): void {
    this._state$.next({ ...this.state, ...newState });
  }
}
