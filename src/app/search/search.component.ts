// src/app/search/search.component.ts
import { Component } from '@angular/core';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  username: string = '';
  repos: any[] = [];
  errorMessage: string = '';
  perPage: number = 10;
  page: number = 1;
  totalRepos: number = 0;

  constructor(private githubService: GithubService) { }

  search(): void {
    this.githubService.getRepos(this.username, this.perPage, this.page).subscribe(
      (data) => {
        this.repos = data;
        this.errorMessage = '';
        this.totalRepos = parseInt(data.headers.get('x-total-count'), 10) || 0; // GitHub API provides the total count of repositories
      },
      (error) => {
        this.repos = [];
        this.errorMessage = error;
      }
    );
  }

  onPerPageChange(event: any): void {
    this.perPage = event.target.value;
    this.page = 1; // Reset to the first page
    this.search();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.search();
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalRepos / this.perPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
