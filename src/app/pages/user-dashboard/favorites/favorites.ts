import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  imports: [FormsModule,CommonModule ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {

}
