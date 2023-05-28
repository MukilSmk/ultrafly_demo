import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  textAreaValue: string = '';
  @Output() submit: EventEmitter<string> = new EventEmitter<string>();
  noteText: string = '';

  constructor(public dialogRef: MatDialogRef<PopupComponent>) {}

  ngOnInit(): void {
  }

  submitTextArea() {
    // Store the textAreaValue in a variable or perform any desired actions
    this.submit.emit(this.noteText);

    // Close the dialog
    this.dialogRef.close();
  }

}
