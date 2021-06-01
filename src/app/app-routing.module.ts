import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './body/about-us/about-us.component';
import { GalleryComponent } from './body/gallery/gallery.component';
import { MainComponent } from './body/main/main.component';
import { CardPageComponent } from './card-page/card-page.component';

const routes: Routes = [
  {path:"main",component:MainComponent},
  {path:"gallery",component:GalleryComponent},
  {path:"about_us",component:AboutUsComponent},
  {path:'product', component:CardPageComponent},
  {path:"**",component:MainComponent},
  // {path:'',redirectTo:'main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MainComponent,GalleryComponent,AboutUsComponent,CardPageComponent]
