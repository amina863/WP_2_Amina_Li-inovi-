import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/news-admin.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  templateUrl: './manage-users.component.html',
  imports: [CommonModule]
})
export class ManageUsersComponent implements OnInit {
  userList: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.userList = data;
      },
      (error) => {
        console.error('Greška pri učitavanju korisnika:', error);
      }
    );
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.userList = this.userList.filter(user => user.id !== userId);
      },
      (error) => {
        console.error('Greška pri brisanju korisnika:', error);
      }
    );
  }
}
