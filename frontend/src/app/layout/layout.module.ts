import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "../components/login/login.component";

const routes: Routes = [
    {
      path: 'login',
      loadChildren: () => import('src/app/components/login/login.module').then(m => m.LoginModule),
    },
    {
      path: 'main',
      component: MainComponent,
      children: [
        {
          path: '',
          outlet: 'header',
          component: HeaderComponent,
        },
        {
          path: '',
          outlet: 'footer',
          component: FooterComponent,
        },
        {
          path: '',
          outlet: 'sidebar',
          component: SidebarComponent,
        }
      ],
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  ];

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
        MainComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})

export class LayoutModule { }