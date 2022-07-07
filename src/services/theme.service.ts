import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  switchTheme(themeId: string){
    const themeLinkElement = this.document.getElementById('app-theme') as HTMLLinkElement;
    if(themeLinkElement && themeId){
      themeLinkElement.href = `${themeId}.css`
    }
  }
}
