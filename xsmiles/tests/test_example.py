#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Bayer AG.
# Distributed under the terms of the Modified BSD License.

import pytest

from ..widget import XSmilesWidget


def test_example_creation_blank():
    w = XSmilesWidget()
    assert w.value == 'Hello World'
