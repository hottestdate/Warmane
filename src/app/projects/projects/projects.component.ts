import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Project } from 'src/app/shared/models/project.model';
import { projects } from 'src/app/shared/data/projects';
import { listFadeAnimation } from 'src/app/shared/animations/list.animation';
import { RouterStateService } from 'src/app/state/router-state/router-state.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MetaTagService } from 'src/app/shared/services/meta-tag/meta-tag.service';

@Component({
  selector: 'nm-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [listFadeAnimation]
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  isHerokuDomain = false;
  projects: Project[] = projects;
  selectedProject = false;
  selectedProjectName = 'none';

  constructor(
    @Inject(DOCUMENT) private document: any,
    private routeService: RouterStateService,
    private metaTagService: MetaTagService
  ) {}

  ngOnInit() {
    this.metaTagService.setTitle('Projects | Nasir Mohammad Portfolio');
    this.metaTagService.updateImgTagDefault();
    this.metaTagService.updateDescriptionTagDefault();

    const fullPath = this.document.location.href;
    if (fullPath.toLowerCase().includes('')) {
      this.isHerokuDomain = true;
    }

    this.routeService
      .getCurrentParams()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.selectedProject = data && data.project;
        this.selectedProjectName = (data && data.project) || 'none';
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
