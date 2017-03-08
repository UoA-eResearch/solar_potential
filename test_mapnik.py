#!/usr/bin/env python
import mapnik

m = mapnik.Map(4000,4000)
mapnik.load_map(m, "style.xml")
m.zoom_all()
mapnik.render_to_file(m, "all.png")