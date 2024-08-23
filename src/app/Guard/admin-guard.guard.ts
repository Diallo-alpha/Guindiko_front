import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from '../services/auth-service.service';

export const AdminGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Récupérez le rôle directement depuis le service
  const roles = authService.getUserRole();

  if (roles && roles.includes('admin')) {
    // Continuez avec la logique si le rôle est 'mentee'
    console.log('L\'utilisateur a le rôle de admin');
    return true; // Si l'utilisateur a le rôle, on retourne `true`
  } else {
    console.log('L\'utilisateur n\'a pas le rôle de mentee ou les rôles sont null');
    router.navigateByUrl('/');
    return false;
  }
}
