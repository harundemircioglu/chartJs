import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'core/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.apiUrl; // Laravel API URL'si

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };

    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Giriş başarılıysa kullanıcı bilgilerini saklayabilirsiniz
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    const userData = { name, email, password };

    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        // Kayıt başarılıysa kullanıcı bilgilerini saklayabilirsiniz
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        // Sunucudan başarılı bir yanıt geldiğinde kullanıcı bilgilerini temizle
        localStorage.removeItem('user');
      })
    );
  }


  isAuthenticated(): boolean {
    // Kullanıcı oturum açmışsa true, aksi takdirde false döndürün
    return !!localStorage.getItem('user');
  }

  getUser(): any {
    // Kullanıcı bilgilerini alma
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
