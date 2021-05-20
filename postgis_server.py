#!/usr/bin/env python
import psycopg2
import psycopg2.extras
from bottle import Bottle, get, run, request, response, abort

DEC2FLOAT = psycopg2.extensions.new_type(
    psycopg2.extensions.DECIMAL.values,
    'DEC2FLOAT',
    lambda value, curs: float(value) if value is not None else None)
psycopg2.extensions.register_type(DEC2FLOAT)
conn = psycopg2.connect(dbname="solar_potential")
cur = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)

application = Bottle()

@application.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@application.get('/')
def get_point():
    if request.method == 'OPTIONS':
      return {}
    lat = request.query.lat
    if not lat:
      abort(500, "no lat given")
    lng = request.query.lng
    if not lng:
      abort(500, "no lng given")
    sql = """SELECT *, ST_ASTEXT(ST_TRANSFORM(geom, 3857)) AS the_geom FROM "solar_potential6" WHERE ST_CONTAINS(geom, ST_TRANSFORM(ST_SetSRID(ST_POINT(%s, %s), 3857), 2193));"""
    cur.execute(sql, (lng, lat))
    data = cur.fetchall()
    return {'results': data}

if __name__ == "__main__":
    run(application, host='0.0.0.0', port=8082, debug=True)
