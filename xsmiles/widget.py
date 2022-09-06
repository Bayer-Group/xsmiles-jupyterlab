#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Bayer AG, 2022.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from typing import Dict, List
from ipywidgets import DOMWidget
from traitlets import Unicode
from ._frontend import module_name, module_version
import json

class XSmilesWidget(DOMWidget):
    """TODO: Add docstring here
    """
    _model_name = Unicode('XSmilesModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('XSmilesView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    value = Unicode('Hello python').tag(sync=True)


    molecules_d= [
        {
          'string': 'CCCCCCCC(=O)Oc1c(Br)cc(C#N)cc1Br',
          'method': {
            'name': 'logBCF perturb',
            'scores': [
              -0.1762678623199463, -0.25460100173950195, -0.2712419033050537,
              -0.2308177947998047, -0.12025833129882812, -0.13311767578125,
              -0.16690635681152344, -0.27755022048950195, -0.38324832916259766,
              -0.2450413703918457, -0.3898346424102783, -0.22409844398498535,
              -0.2113962173461914, -0.12725472450256348, -0.04010510444641113,
              -0.01143336296081543, -0.05576324462890625, 0.18838262557983398,
              0.0361400842666626, 0.0019290447235107422, 0.0008728504180908203,
              -0.028931856155395508, 0.05310940742492676, 0.35703766345977783,
              -0.16322708129882812, 0.07348740100860596, -0.037914276123046875,
              0.0180361270904541, -0.047339677810668945, 0.06556379795074463,
            ],
          },
          'attributes': {
            'pred_logD': 5.300230503082275,
            'pred_logBCF': 2.0161044597625732,
            'max_bcf_attr_perturb': 0.3898346424102783,
            'max_lod_attr_perturb': 1.0564279556274414,
            'logD-logBCF': 3.284126043319702,
            'Compound ID': 'bromoxynil octanoate',
          },
        },
      ]
      
    gradient_config_d = {
      }

    view_config_d = {
    }

    molecules = Unicode(json.dumps(molecules_d)).tag(sync=True)
    gradient_config = Unicode(json.dumps(gradient_config_d)).tag(sync=True)
    view_config = Unicode(json.dumps(view_config_d)).tag(sync=True)

