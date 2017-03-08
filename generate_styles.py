#!/usr/bin/env python
from xmltodict import unparse
import json
import glob

colors = {
  'OrRd': ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'],
}

styles = []
for name, l in colors.items():
  stops = []
  for i in range(len(l)):
    r = {
      '@color': l[i],
      '@value': i * 150 + 100
    }
    stops.append(r)
  style = {
    '@name': name,
    'Rule': {
      'RasterSymbolizer': {
        'RasterColorizer': {
          '@default-mode': 'discrete',
          '@default-color': 'transparent',
          'stop': stops
        }
      }
    }
  }
  styles.append(style)

files = sorted(glob.glob("Rasters_bands/*.tif"))
layers = []
for f in files:
  layer = {
    '@name': f,
    '@srs': '+init=epsg:2193', # input projection
    'StyleName': {
      '#text': 'OrRd'
    },
    'Datasource': {
      'Parameter': [
        {
          '@name': 'file',
          '#text': f
        },
        {
          '@name': 'type',
          '#text': 'gdal'
        },
        {
          '@name': 'band',
          '#text': '1'
        }
      ]
    }
  }
  layers.append(layer)

d = {
  'Map': {
    '@background-color': 'transparent',
    '@srs': '+init=epsg:3857', # output projection
    'Style': styles,
    'Layer': layers
  }
}
print(unparse(d, pretty=True, full_document=False))