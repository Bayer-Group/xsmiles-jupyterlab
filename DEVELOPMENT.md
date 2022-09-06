
# Development

**First** you need `xsmiles` (npm package) to be downloaded in the root folder of this project: https://github.com/Bayer-Group/xsmiles/releases/download/0.6.5/xsmiles-0.6.5.tgz

## Development Installation

Create a dev environment:

```bash

# if you have conda license (or are free to use it)
conda create -n xsmiles-dev -c conda-forge nodejs yarn python jupyterlab
conda activate xsmiles-dev


# if you can't use conda, try pip:
python -m venv .venv-xsmiles-ipywidget
source .venv-xsmiles-ipywidget/bin/activate
pip install jupyterlab nodejs
npm install --global yarn # with sudo? if necessary
```

Install the python. This will also build the TS package.

```bash
pip install -e ".[test, examples]"
```

When developing your extensions, you need to manually enable your extensions with the
notebook / lab frontend. For lab, this is done by the command:

```bash
jupyter labextension develop --overwrite .
yarn run build
```

For classic notebook, you need to run:

```bash
jupyter nbextension install --sys-prefix --symlink --overwrite --py xsmiles
jupyter nbextension enable --sys-prefix --py xsmiles
```

Note that the `--symlink` flag doesn't work on Windows, so you will here have to run
the `install` command every time that you rebuild your extension. For certain installations
you might also need another flag instead of `--sys-prefix`, but we won't cover the meaning
of those flags here.

### How to see your changes

#### Typescript:

If you use JupyterLab to develop then you can watch the source directory and run JupyterLab at the same time in different
terminals to watch for changes in the extension's source and automatically rebuild the widget.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
yarn run watch
# Run JupyterLab in another terminal
jupyter lab
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:

If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.

### Others

If you are developing the xsmiles-0.6.5.tgz (Javascript) and need to reinstall it multiple times to see the results within JupyterLab, try:

```bash
rm -r ./node_modules/xsmiles
#or
npm remove xsmiles
npm install xsmiles-0.6.5.tgz
yarn watch
```

Check versions with `jupyter labextension list`.

Install a dev version with `jupyter labextension develop --overwrite .`.
If an old version or a pip-installed (prod) is already there and is not being replaced, try `jupyter labextension uninstall xsmiles`. You need a dev version in the plugin list.
If it doesn't work, try `pip uninstall xsmiles`, then `pip install -e ".[test, examples]"`, then `jupyter labextension develop --overwrite .` and `yarn run build` or `yarn run watch`.


## Releasing your initial packages:

- Add tests
- Ensure tests pass locally and on CI. Check that the coverage is reasonable.
- Make a release commit, where you remove the `, 'dev'` entry in `_version.py` AND `_frontend.py`.
- Update the version in `package.json`
- Relase the npm packages:

  ```bash
  npm login
  npm publish
  ```

- Bundle the python package: `python setup.py sdist bdist_wheel`
- Publish the package to PyPI:

  ```bash
  pip install twine
  twine upload dist/<python package name>*
  ```
  
- Tag the release commit (`git tag <python package version identifier>`)
- Update the version in `_version.py`, and put it back to dev (e.g. 0.1.0 -> 0.2.0.dev).
  Update the versions of the npm packages (without publishing).
- Commit the changes.
- `git push` and `git push --tags`.