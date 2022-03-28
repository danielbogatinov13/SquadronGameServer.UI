import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { IDeactivateComponent } from "../components/deactivate.component";

@Injectable()
export class DeactivateGuard implements CanDeactivate <IDeactivateComponent>
{
    component!: Object;
    route!: ActivatedRouteSnapshot;
 
   constructor(){
   }
 
   canDeactivate(component:IDeactivateComponent,
                route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot,
                nextState: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        
        return component.canExit();
  }
 
}