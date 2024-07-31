import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-80b46","appId":"1:231830366506:web:e1f13609b8d52975959653","storageBucket":"simple-crm-80b46.appspot.com","apiKey":"AIzaSyAtqpHgjYGa8ggV341RVMV1qxQ2VN2ZyQg","authDomain":"simple-crm-80b46.firebaseapp.com","messagingSenderId":"231830366506"})), provideFirestore(() => getFirestore()),]
};
