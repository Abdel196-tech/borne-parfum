import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-choice-parfum',
  templateUrl: './choice-parfum.component.html',
  styleUrls: ['./choice-parfum.component.css']
})
export class ChoiceParfumComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
    console.log("ChoiceParfumComponent chargé avec succès !");
  }

  goBack(): void {
    this.location.back();
  }
}