import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estimate-totals',
  template: `
    <div class="border-t pt-4">
      <div class="flex justify-end space-y-2">
        <div class="w-64 space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Subtotal:</span>
            <span class="font-medium">{{form.get('subtotal')?.value | currency}}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Tax ({{taxRate}}%):</span>
            <span class="font-medium">{{form.get('tax')?.value | currency}}</span>
          </div>
          <div class="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>{{form.get('total')?.value | currency}}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EstimateTotalsComponent {
  @Input() form!: FormGroup;
  @Input() taxRate: number = 0;
}