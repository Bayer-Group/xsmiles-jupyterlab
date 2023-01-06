# XSMILES visualizations in Jupyter Lab

A Custom Jupyter Lab Widget to visualize SMILES-based and atom-based scores.

## Please Cite

If you use XSMILES, the use cases, its code, or the generated explanations, please cite our article:

https://jcheminf.biomedcentral.com/articles/10.1186/s13321-022-00673-w

```
Heberle, H., Zhao, L., Schmidt, S. et al. XSMILES: interactive visualization for molecules, SMILES and XAI attribution scores. J Cheminform 15, 2 (2023). https://doi.org/10.1186/s13321-022-00673-w
```

```BibTeX
@article{Heberle2023XSMILES,
author={Heberle, Henry and Zhao, Linlin and Schmidt, Sebastian and Wolf, Thomas and Heinrich, Julian},
title={XSMILES: interactive visualization for molecules, SMILES and XAI attribution scores},
journal={Journal of Cheminformatics},
year={2023},
month={Jan},
day={06},
volume={15},
number={1},
pages={2},
abstract={Explainable artificial intelligence (XAI) methods have shown increasing applicability in chemistry. In this context, visualization techniques can highlight regions of a molecule to reveal their influence over a predicted property. For this purpose, some XAI techniques calculate attribution scores associated with tokens of SMILES strings or with atoms of a molecule. While an association of a score with an atom can be directly visually represented on a molecule diagram, scores computed for SMILES non-atom tokens cannot. For instance, a substring [N+] contains 3 non-atom tokens, i.e., [, {\$}{\$}+{\$}{\$}, and ], and their attributions, depending on the model, are not necessarily revealing an influence of the nitrogen atom over the predicted property; for that reason, it is not possible to represent the scores on a molecule diagram. Moreover, SMILES's notation is complex, foregrounding the need for techniques to facilitate the analysis of explanations associated with their tokens.},
issn={1758-2946},
doi={10.1186/s13321-022-00673-w},
url={https://doi.org/10.1186/s13321-022-00673-w}
}


![JupyterLab Notebook](/examples/widget_example.png)

## Availability and examples

- [XSMILES main page](https://github.com/Bayer-Group/xsmiles)

- [Demo website](https://bayer-group.github.io/xsmiles/dist/web/)

- [HOW TO use XSMILES with JupyterLab notebook](examples/xsmiles_examples.ipynb)

- [More examples with JupyterLab](https://github.com/Bayer-Group/xsmiles-use-cases)

- [Unofficial Pypi repository](https://pypi.org/project/xsmiles/)

- [KNIME component? Check the main page](https://github.com/Bayer-Group/xsmiles)

## Example Notebook with a how-to

To use XSMILES with Jupyter Lab you need to install the package with pip **and have internet connection** while using it.

RDKit MinimalLib is downloaded by your browser.

Please check this notebook to see **how to use** the tool: [Notebook](examples/xsmiles_examples.ipynb)

Note that it is only being tested with Jupyter**Lab**. A reason for you to use Lab is the space available for visualizations, which is much better than in regular Jupyter notebooks. We also had problems with the installation for non-Lab notebooks.

## Installation

### Quick example - create conda environment and installs xsmiles

```bash
conda create --name xsmiles_env python=3.7 -c conda-forge # create conda env with python 3.7

conda activate xsmiles_env # activate the created env

# install dependencies for the example notebook
conda install -c conda-forge jupyterlab rdkit matplotlib

# You can install the latest official version from this repo with: 
# pip install xsmiles-0.2.2-py2.py3-none-any.whl
# Unofficial pypi xsmiles:
pip install xsmiles 

jupyter lab examples/xsmiles_examples.ipynb # run a notebook with jupyter lab
```

### Quick example - create environment with python venv
```bash
# tested with python 3.8
python -m venv xsmiles_env
# activate env
source ./xsmiles_env/bin/activate

# You can install the latest official version from this repo with: 
# pip install xsmiles-0.2.2-py2.py3-none-any.whl
# Unofficial pypi xsmiles:
pip install xsmiles

# install dependencies for the example notebook
pip install jupyterlab rdkit matplotlib 

jupyter lab examples/xsmiles_examples.ipynb
```

## Uninstall

- `pip uninstall xsmiles`
- `rm -r <path-to:>/share/jupyter/labextensions/xsmiles`
- `jupyter labextension list`


## Development

Please check the `DEVELOPMENT.md` file.
