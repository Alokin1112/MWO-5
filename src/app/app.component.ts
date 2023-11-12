import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ds-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-template';

  async ngOnInit(): Promise<void> { //hack browser mobile

    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.getRegistrations().then(async function (registrations) {
        //returns installed service workers
        if (registrations.length) {
          for (const registration of registrations) {
            await registration.unregister();
            console.log(registrations, registration, "success");
          }
        }
      });
    }
  }

}
