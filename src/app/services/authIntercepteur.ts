// auth.interceptor.ts
import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let token = localStorage.getItem("token");

  if (token) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const newRequest = req.clone({ headers });
    return next(newRequest);
  }

  return next(req);
}
