import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth-service.service";

export const MentorGuard = () => {

  const router = inject(Router);
  const authService = inject(AuthService);

  //recuperer le rôle depuis le authservice
  const roles = authService.getUserRole();

  if (roles && roles.includes('mentor')) {
    // continuez avec la logique si le rôle est 'mentor'
    console.log('L\'utilisateur a le rôle de mentor');
    return true; // Si l'utilisateur a le rôle, on retourne `true`
  }else{
    console.log('L\'utilisateur n\'a pas le rôle de mentor ou les rôles sont null');
    router.navigateByUrl('/');
    return false;
  }
}
