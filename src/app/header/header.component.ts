import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false
  private subscription: Subscription

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

  onSaveData() {
    this.dataStorageService.storeRecipes()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe(user => {
      console.log(user)
      this.isAuthenticated = !!user
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
