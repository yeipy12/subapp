import { Observable } from 'rxjs';

export interface IServicebdService {
  getData(): Observable<any>;
}
