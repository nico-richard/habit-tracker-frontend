import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './models/user';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnDestroy {
  constructor(private appService: AppService) {}
  private getSubscription: Subscription;
  private postSubscription: Subscription;
  private delSubscription: Subscription;

  title = 'Habit tracker';

  userForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  users: User[] = [];
  userCount = 0;

  onSubmit() {
    this.postSubscription = this.appService
      .addUser(this.userForm.getRawValue())
      .subscribe((data: Object) => {
        console.log('user added from frontend : ' + JSON.stringify(data));
        this.userCount += 1;
        this.userForm.reset();
      });
  }

  getAllUsers() {
    this.getSubscription = this.appService
      .getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
        this.userCount = this.users.length;
      });
  }

  onDelete(index: number) {
    this.delSubscription = this.appService
      .deleteUser(index)
      .subscribe((data: string) => console.log(data));
    this.userCount -= 1;
  }

  infos() {
    console.log(this.users);
  }

  ngOnDestroy(): void {
    this.getSubscription.unsubscribe();
    this.postSubscription.unsubscribe();
    this.delSubscription.unsubscribe();
  }
}
