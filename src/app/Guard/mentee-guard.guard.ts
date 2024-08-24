import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth-service.service";

export const MenteeGuard = () => {

  const router = inject(Router);
  const authService = inject(AuthService);

  //recuperer le rôle depuis le authservice
  const roles = authService.getUserRole();

  if (roles && roles.includes('mentee')) {
    // continuez avec la logique si le rôle est 'mentee'
    console.log('L\'utilisateur a le rôle de mentee');
    return true; // si l'utilisateur a le rôle, on retourne `true`
  } else {
    console.log('L\'utilisateur n\'a pas le rôle de mentee ou les rôles sont null');
    router.navigateByUrl('/'); // redirection si le rôle ne correspond pas
    return false; // si l'utilisateur n'a pas le bon rôle, on retourne `false`
  }
}
