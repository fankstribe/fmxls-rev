import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Output() sidenavRightClose = new EventEmitter();

  constructor() {}

  ngOnInit(): void {

  }

  onSidenavRightClose() {
    this.sidenavRightClose.emit()
  }
}
