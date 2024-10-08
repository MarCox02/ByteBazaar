import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string | null = null;

  constructor() { }

  // Método para iniciar sesión y establecer el usuario logueado
  login(userId: string) {
    this.userId = userId;
    localStorage.setItem('userId', userId); // Almacenar el ID en localStorage


  }

  // Método para obtener el ID del usuario logueado
  getUserId(): string | null {
    if (this.userId) {
      return this.userId;
    }
    this.userId = localStorage.getItem('userId');
    return this.userId;
  }

  // Método para cerrar sesión
  logout() {
    this.userId = null;
    localStorage.removeItem('userId'); // Eliminar el ID del localStorage
  }
}

