import {
  SingleViewProps,
  Molecule,
  MoleculeWithMethods,
  GradientConfig,
  appendSingleView,
  Method,
} from 'xsmiles';

const updateVis = (
  div: HTMLDivElement,
  moleculeJSON: string,
  gradientConfigJSON: string,
  viewConfigJSON = '{}'
): any => {
  console.log(
    'Updating vis 7',
    // moleculeJSON,
    gradientConfigJSON,
    viewConfigJSON
  );

  if (moleculeJSON == null || gradientConfigJSON == null) {
    console.error(
      'Null input, mol, gradient:',
      moleculeJSON,
      gradientConfigJSON
    );
    return;
  }

  const gradientConfig: GradientConfig = JSON.parse(gradientConfigJSON);

  console.log('getGradientConfigInWidget', gradientConfig);

  const viewConfigRaw: any = JSON.parse(viewConfigJSON);
  const { hideBarChart = false } = viewConfigRaw;
  const { hideAttributesTable = false } = viewConfigRaw;
  const { drawerType = 'RDKitDrawer_black' } = viewConfigRaw;
  const { showScoresOnStructure = false } = viewConfigRaw;

  console.log('view config', viewConfigRaw, viewConfigJSON);

  const molecules: MoleculeWithMethods[] = JSON.parse(moleculeJSON);

  molecules.forEach((moleculeWithMultipleMethods, i: number) => {
    const { string, methods, sequence, attributes } =
      moleculeWithMultipleMethods;

    let row: HTMLDivElement = div;
    if (moleculeWithMultipleMethods.methods.length > 1) {
      row = document.createElement('div');
      const row_separator = document.createElement('hr');
      div.append(row);
      div.append(row_separator);
      row.classList.add('row');
      div.classList.add('row-container');
      row_separator.classList.add('row-separator');
    }

    console.log('Appended rows', div);

    methods.forEach((method: Method) => {
      console.log('method', method);
      const molecule: Molecule = { string, sequence, attributes, method };
      console.log('molecule', molecule);
      const setup: SingleViewProps = {
        molecule,
        gradientConfig,
        hideBarChart,
        hideAttributesTable,
        drawerType,
        showScoresOnStructure,
      };

      console.log('RDKit in window', window.RDKit);

      const child = document.createElement('div');
      row.append(child); // row = div is molecule.methods.length === 1, if > we want to separate them... so row = div.new_div

      if (window.RDKit == null) {
        const script = document.createElement('script');
        script.onload = function () {
          if (window.initRDKitModule) {
            console.log('Loading RDKit...');
            window.initRDKitModule().then((RDKit: any) => {
              window.RDKit = RDKit;
              console.log('RDKit in window', window.RDKit);
              appendSingleView(child, setup);
            });
          }
        };
    
        script.src =
          'https://unpkg.com/@rdkit/rdkit@2021.9.3/Code/MinimalLib/dist/RDKit_minimal.js'; // <-- shorter url
        script.async = false;
        document.head.appendChild(script);
      } else {
        appendSingleView(child, setup);
      }
    });
  });
};

export default updateVis;
