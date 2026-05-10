import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiIcon, TuiLabel, TuiSliderComponent} from '@taiga-ui/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiChevron, TuiDataListWrapper, TuiSelect, TuiTooltip} from '@taiga-ui/kit';

export interface Resolution {
  width: number;
  height: number;
}

export interface AspectRatio {
  a: number;
  b: number;
}

@Component({
  selector: 'app-fov-calculator',
  imports: [
    TuiSliderComponent,
    TuiLabel,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    TuiChevron,
    TuiDataListWrapper,
    TuiIcon,
    TuiSelect,
    TuiTooltip,
  ],
  templateUrl: './fov-calculator.html',
  styleUrl: './fov-calculator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FovCalculator {

  inputs = new FormGroup({
    screenSize: new FormControl(27),
    resolution: new FormControl("1920x1080"),
    distance: new FormControl(60)
  });

  fov: string = this.calculateFoV(27, "1920x1080", 60).toFixed(1);

  ngOnInit(): void {
    this.inputs.valueChanges.subscribe(values => {
      this.fov = this.calculateFoV(values.screenSize!, values.resolution!, values.distance!).toFixed(1);
    });
  }

  protected readonly resolutions = [
    '1920x1080',
    '2560x1080',
    '2560x1440',
    '3440x1440',
    '3840x2160',
    '5120x1440',
    '5120x2160',
    '7680x2160'
  ];

  parseResolution(resolution: string) : Resolution {
    const [width, height] = resolution.split("x").map(Number);
    return {width, height};
  }

  ggt(a: number, b: number): number {
    return b === 0 ? a : this.ggt(b, a % b);
  }

  calculateAspectRatio(resolution: Resolution) : AspectRatio {

    const ggt: number = this.ggt(resolution.width, resolution.height);
    return {a: resolution.width / ggt, b: resolution.height / ggt};

  }

  calculateWidth(diagonal: number, aspectRatio: AspectRatio): number {
    return diagonal * 2.54 * (aspectRatio.a / Math.sqrt(Math.pow(aspectRatio.a, 2) + Math.pow(aspectRatio.b, 2)))
  }

  calculateFoV(screenSize: number, resolution: string, distance: number): number {

    const aspectRatio = this.calculateAspectRatio(this.parseResolution(resolution))
    const width = this.calculateWidth(screenSize, aspectRatio);
    return (2 * Math.atan((width / 2) / distance) * (180 / Math.PI));
  }

}
