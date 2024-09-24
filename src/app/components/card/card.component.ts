import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title: string = 'Total Students';
  @Input() score: string = '0';
  constructor() { }

  ngOnInit(): void {
  }

}
