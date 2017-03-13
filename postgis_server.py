#!/usr/bin/env python
import psycopg2
import psycopg2.extras
from bottle import get, run, request

DEC2FLOAT = psycopg2.extensions.new_type(
    psycopg2.extensions.DECIMAL.values,
    'DEC2FLOAT',
    lambda value, curs: float(value) if value is not None else None)
psycopg2.extensions.register_type(DEC2FLOAT)
conn = psycopg2.connect(dbname="solar_potential")
cur = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)

@get('/')
def get_point():
    lat = request.query.lat
    if not lat:
      return {"error": "no lat given"}
    lng = request.query.lng
    if not lng:
      return {"error": "no lng given"}
    sql = """SELECT *, ST_ASTEXT(ST_TRANSFORM(geom, '+init=epsg:2193', '+init=epsg:3857')) AS geom FROM buildings WHERE ST_CONTAINS(geom, ST_TRANSFORM(ST_POINT(%s, %s), '+init=epsg:3857', '+init=epsg:2193'));"""
    cur.execute(sql, (lng, lat))
    data = cur.fetchall()
    return {'results': data}

run(host='0.0.0.0', port=8082, debug=True)