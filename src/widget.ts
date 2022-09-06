// Copyright (c) Bayer AG
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
  WidgetModel,
  WidgetView,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';

import updateVis from './update_vis';

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
      value: 'Hello default', // not sure when this is used, the values in the .widget.py file are used.
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'XSmilesModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'XSmilesView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class XSmilesView extends DOMWidgetView {
  private _div: HTMLDivElement;

  initialize(parameters: WidgetView.InitializeParameters<WidgetModel>): void {
    this._div = document.createElement('div');
    this._div.classList.add('custom-widget');

    this.el.append(this._div);
    this._div.textContent = 'Rendering...';

    console.log(
      'Result2:',
      this._div,
      this._div.textContent,
      this.model.get('molecules'),
      this.model.get('gradient_config'),
      this.model.get('view_config')
    );

    this.on('render', this.value_changed);
  }

  render() {
    setTimeout(() => {
      this.trigger('render');
    }, 0);
    return this;
  }

  // Returns true if the view element is in the DOM
  rendered() {
    return this._div.isConnected;
  }

  remove() {
  }

  value_changed() {
    while (
      document.body.contains(this._div) == false &&
      this._div.baseURI == null &&
      this._div.isConnected === false
    ) {
      console.log('Connecting...');
    }

    console.log(
      document.getElementById('test'),
      this._div.isConnected,
      document.body.contains(this._div)
    );

    if (this.rendered()) {
      console.log(
        'FOUND!!!',
        this._div,
        this._div.isConnected,
        document.body.contains(this._div)
      );
      this._div.textContent = '';
      updateVis(
        this._div,
        this.model.get('molecules'),
        this.model.get('gradient_config'),
        this.model.get('view_config')
      );
    } else {
      console.log(
        'Not found... :( ',
        document.getElementById('test'),
        this._div.isConnected,
        document.body.contains(this._div)
      );
    }
  }
}