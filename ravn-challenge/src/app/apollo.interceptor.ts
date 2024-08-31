import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { apolloToken } from "./graphql.config";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    // Inject the current `AuthService` and use it to get an authentication token:

    // Clone the request to add the authentication header.
    const newReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${apolloToken}`
        }
    });
    return next(newReq);
}