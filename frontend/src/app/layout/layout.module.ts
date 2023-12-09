import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('src/app/components/login/login.module').then(m => m.LoginModule),
    },
    {
      path: 'main',
      component: MainComponent,
      children: [
        {
          path: '',
          outlet: 'footer',
          component: FooterComponent,
        },
        {
          path: '',
          outlet: 'sidebar',
          component: SidebarComponent,
        },
        {
          path: 'recommender',
          loadChildren: () => import('src/app/components/recommender/recommender.module').then(m => m.RecommenderModule),
        },
        {
          path: 'dashboard',
          loadChildren: () => import('src/app/components/dashboard/dashboard.module').then(m => m.DashboardModule),
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
        RouterModule.forChild(routes),
    ]
})

export class LayoutModule { }