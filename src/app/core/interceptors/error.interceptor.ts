import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError(err => {
            console.error('Error en llamada HTTP', err);
            alert('Ocurrió un error en el servidor');
            return throwError(() => err);
        })
    );
};