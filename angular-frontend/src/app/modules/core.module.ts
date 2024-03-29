import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpErrorInterceptor} from "../services/interceptors/http-error.interceptor";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
