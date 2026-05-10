import { TuiRoot } from '@taiga-ui/core';
import { Component, signal } from '@angular/core';
import {FovCalculator} from './components/fov-calculator/fov-calculator';

@Component({
  selector: 'app-root',
  imports: [TuiRoot, TuiRoot, FovCalculator],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fov-calculator');
}
