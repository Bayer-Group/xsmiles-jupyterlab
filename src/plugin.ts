// Copyright (c) Bayer AG
// Distributed under the terms of the Modified BSD License.
// import * as $ from 'jquery';

import { Application, IPlugin } from '@phosphor/application';

import { Widget } from '@phosphor/widgets';

import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';

import * as widgetExports from './widget';

import { MODULE_NAME, MODULE_VERSION } from './version';

const EXTENSION_ID = 'xsmiles-ipywidget:plugin';

declare global {
  interface Window {
    initRDKitModule: any;
    RDKit: any;
  }
}

const script = document.createElement('script');
script.onload = function () {
  if (window.initRDKitModule) {
    console.log('Loading RDKit...');
    window.initRDKitModule().then((RDKit: any) => (window.RDKit = RDKit));
  }
};
// script.src = 'https://unpkg.com/@rdkit/rdkit@2021.9.3'; // <-- shorter url
//https://www.npmjs.com/package/@rdkit/rdkit/v/2022.3.1
script.src =
  'https://unpkg.com/@rdkit/rdkit@2022.3.1/Code/MinimalLib/dist/RDKit_minimal.js'; // <-- shorter url
script.async = false;
document.head.appendChild(script);

/**
 * The example plugin.
 */
const examplePlugin: IPlugin<Application<Widget>, void> = {
  id: EXTENSION_ID,
  requires: [IJupyterWidgetRegistry],
  activate: activateWidgetExtension,
  autoStart: true,
} as unknown as IPlugin<Application<Widget>, void>;
// the "as unknown as ..." typecast above is solely to support JupyterLab 1
// and 2 in the same codebase and should be removed when we migrate to Lumino.

export default examplePlugin;

/**
 * Activate the widget extension.
 */
function activateWidgetExtension(
  app: Application<Widget>,
  registry: IJupyterWidgetRegistry
): void {
  registry.registerWidget({
    name: MODULE_NAME,
    version: MODULE_VERSION,
    exports: widgetExports,
  });
}
