import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class BackEndService {
  public constructor (
    private http: HttpClient
  ) { }

  private getUserHeaders (): any {
    return { }
  }

  public postRequest<T> (action: string, body: any = {}): Promise<T> {
    const headers = this.getUserHeaders()

    return this.http.post<T>(
      environment.backend.server.url + action,
      body,
      { headers }
    ).toPromise()
  }
}
