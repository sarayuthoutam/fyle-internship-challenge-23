// src/app/repo-list/repo-list.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent {
  @Input() repos: any[] = [];
}
