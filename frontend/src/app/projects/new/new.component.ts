import { Component, OnInit } from '@angular/core'

// services
import { BackEndService } from 'src/app/shared/back-end.service';

// models
import { Page } from 'src/app/shared/page/page.model'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class ProjectsNewPage extends Page implements OnInit {
  public readonly formData: any = {
    origins: [
      { key: 'git', value: 'Git' },
      { key: 'ftp', value: 'FTP' },
    ],
    frameworks: [
      { key: 'angular', value: 'Angular' }
    ]
  }

  public modelData: any = {
    framework: 'angular',
    origin: 'git',
    url: ''
  }

  public constructor (
    public backend: BackEndService
  ) {
    super()
  }

  public ngOnInit (): void {
  }

  public canSave (): boolean {
    return this.modelData.url !== ''
      && this.modelData.origin !== ''
  }

  public onCancel (): void {
    window.alert('cancel')
  }

  public onSave (): void {
    this.pageData.loading = true
    this.backend.postRequest('projects/new', this.modelData)
    .then(() => {})
    .catch((error) => this.pageData.error = error)
    .finally(() => this.pageData.loading = false)
  }
}
