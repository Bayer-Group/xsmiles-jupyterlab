// Copyright (c) Bayer AG
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';

export class XSmilesModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: XSmilesModel.model_name,
      _model_module: XSmilesModel.model_module,
      _model_module_version: XSmilesModel.model_module_version,
      _view_name: XSmilesModel.view_name,
      _view_module: XSmilesModel.view_module,
      _view_module_version: XSmilesModel.view_module_version,
      value: 'Hello World',
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'ExampleModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ExampleView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class XSmilesView extends DOMWidgetView {
  render() {
    this.el.classList.add('custom-widget');

    this.value_changed();
    this.model.on('change:value', this.value_changed, this);
  }

  value_changed() {
    this.el.textContent = this.model.get('value');
    console.log('Result2:', this.el.textContent);
  }
}
