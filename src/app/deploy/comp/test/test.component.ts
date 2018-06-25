import { Component, OnInit} from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'test-comp',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent extends BaseComponent implements OnInit {
}
