import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (!authService.token) return next(req);
  let authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.token.access_token}`,
    },
  });
  return next(authRequest);
};
