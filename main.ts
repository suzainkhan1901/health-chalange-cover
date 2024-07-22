// app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: any[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    }
  ];

  filteredUsers: any[] = [];
  searchName: string = '';
  filterType: string = '';

  constructor() {
    this.filteredUsers = this.users;
  }

  addUser(name: string, type: string, minutes: number) {
    const user = {
      id: this.users.length + 1,
      name: name,
      workouts: [
        { type: type, minutes: minutes }
      ]
    };
    this.users.push(user);
    this.filteredUsers = this.users;
  }

  filterUsers() {
    if (this.searchName && this.filterType) {
      this.filteredUsers = this.users.filter((user) => {
        return user.name.toLowerCase().includes(this.searchName.toLowerCase()) && user.workouts.some((workout) => {
          return workout.type.toLowerCase() === this.filterType.toLowerCase();
        });
      });
    } else if (this.searchName) {
      this.filteredUsers = this.users.filter((user) => {
        return user.name.toLowerCase().includes(this.searchName.toLowerCase());
      });
    } else if (this.filterType) {
      this.filteredUsers = this.users.filter((user) => {
        return user.workouts.some((workout) => {
          return workout.type.toLowerCase() === this.filterType.toLowerCase();
        });
      });
    } else {
      this.filteredUsers = this.users;
    }
  }
}
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('chart', { static: false }) chartElement: ElementRef;
  chart: any;

  // ...

  ngAfterViewInit() {
    const chartData = this.getChartData();

    this.chart = new Chart(this.chartElement.nativeElement, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Workout Minutes',
          data: chartData.data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getChartData() {
    const labels = [];
    const data = [];

    this.users.forEach((user) => {
      labels.push(user.name);
      let totalMinutes = 0;
      user.workouts.forEach((workout) => {
        totalMinutes += workout.minutes;
      });
      data.push(totalMinutes);
    });

    return { labels, data };
  }
