import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css']
})
export class ThemeSelectorComponent {

  themes = [
    {name: 'Jasny', id: 'light-theme'},
    {name: 'Ciemny', id: 'dark-theme'},
  ];
  selectedTheme = this.themes[0];

  constructor(private readonly _themeService: ThemeService) {
  }


  onThemeChanged({id}: { id: string }) {
    this._themeService.switchTheme(id);
  }
}
