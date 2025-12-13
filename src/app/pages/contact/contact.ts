import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
})
export class ContactComponent {

  form = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  sending = false;
  success = false;

  constructor(private contactService: ContactService) {}

  send(): void {
    if (!this.form.name || !this.form.email || !this.form.message) {
      alert('Please fill all required fields');
      return;
    }

    this.sending = true;

    this.contactService.sendMessage({
      ...this.form,
      date: new Date().toISOString()
    }).subscribe(() => {
      this.success = true;
      this.sending = false;

      this.form = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };

      // Auto hide toast
      setTimeout(() => this.success = false, 3000);
    });
  }
}
