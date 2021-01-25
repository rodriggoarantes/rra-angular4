import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  /**
    from(rotinas)
      .pipe(mergeMap((rotina: string) => this.permissaoRotinaService.getPermissoesNaRotina(rotina), 20))
      .subscribe((res) => {
        console.log(JSON.stringify(res));
      });

    forkJoin(arrayObservable).subscribe((res) => console.log(JSON.stringify(res)));
   */
}
