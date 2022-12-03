import { Manager } from './../../../../models/manager';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../../../core/services/manager.service';

@Component({
  selector: 'app-team-panel',
  templateUrl: './team-panel.component.html',
  styleUrls: ['./team-panel.component.scss'],
})
export class TeamPanelComponent implements OnInit {
  managerTeam: string;
  teamLogo: string;

  constructor(private managerService: ManagerService) {}

  ngOnInit() {
    this.managerService.getMyManager().subscribe((res) => {
      if (res) {
        this.managerTeam = res.team.teamName;
        this.teamLogo = res.team.img;
      }
    });
  }
}
