import { Component, inject } from '@angular/core';
import { SellerService } from '../../services/seller/seller.service';
import { SellerProfileInfo } from '../../models/seller-profile-info';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './seller-profile.component.html',
  styleUrl: './seller-profile.component.css'
})
export class SellerProfileComponent {
  private sellerService = inject(SellerService);
  activeTab: string = 'products';
  profile: SellerProfileInfo | undefined; 
  ngOnInit(): void {
    this.getProfileInfo();
  }

  getProfileInfo(): void {
    this.sellerService.profileInfo().subscribe({
      next: (data) => {
        this.profile = data.data;
        console.log('Profile:', this.profile);
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });  }

    setActiveTab(tab: string): void {
      this.activeTab = tab;
    }
  
    isActive(tab: string): boolean {
      return this.activeTab === tab;
    }
   

}
