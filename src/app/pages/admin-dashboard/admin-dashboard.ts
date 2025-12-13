import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication';
import { House } from '../../models/house.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  publications: House[] = [];
  messages: any[] = [];
  loading = true;
  activeTab: 'users' | 'publications' | 'messages' = 'users';

  constructor(
    private userService: UserService,
    private publicationService: PublicationService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser || currentUser.role !== 'admin') {
      alert('Access Denied: Admins Only');
      window.location.href = '/';
      return;
    }

    this.loadAllData();
  }

  loadAllData(): void {
    this.loading = true;

    this.userService.getUsers().subscribe(users => this.users = users);
    this.publicationService.getAll().subscribe(pubs => this.publications = pubs);
    this.contactService.getMessages().subscribe(msgs => {
      this.messages = msgs;
      this.loading = false;
    });
  }

  setTab(tab: 'users' | 'publications' | 'messages') {
    this.activeTab = tab;
  }

  toggleBan(user: any): void {
    if (user.role === 'admin') {
      alert('Cannot ban an admin!');
      return;
    }

    const action = user.banned ? 'unban' : 'ban';
    if (confirm(`Are you sure you want to ${action} ${user.name}?`)) {
      this.userService.updateUser(user.id, { banned: !user.banned }).subscribe(() => {
        user.banned = !user.banned;
        alert(`${user.name} has been ${action}ed`);
      });
    }
  }

  deletePublication(id: any): void {
    if (confirm('Permanently delete this publication?')) {
      this.publicationService.delete(id).subscribe(() => {
        this.publications = this.publications.filter(p => p.id !== id);
        alert('Publication deleted');
      });
    }
  }
}