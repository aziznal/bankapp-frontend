import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./login-page/components/login-form/login-form.component";
import { LayoutComponent } from "./main-page/components/layout/layout.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent
    },

    {
        path: 'login',
        component: LoginFormComponent
    },

    {
        path: '**',
        redirectTo: '/'
    }

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}) export class PagesRoutingModule {}