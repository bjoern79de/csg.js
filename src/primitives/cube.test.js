const test = require('ava')

const geom3 = require('../geometry/geom3')

const {cube} = require('./index')

const comparePolygonsAsPoints = require('../../test/helpers/comparePolygonsAsPoints')

test('cube (defaults)', t => {
  const obs = cube()
  const pts = geom3.toPoints(obs)
  t.is(pts.length, 6)
})

test('cube (options)', t => {
  // test size
  let obs = cube({size: 3.5})
  let pts = geom3.toPoints(obs)
  let exp = [
    [ [ -3.5, -3.5, -3.5 ], [ -3.5, -3.5, 3.5 ], [ -3.5, 3.5, 3.5 ], [ -3.5, 3.5, -3.5 ] ],
    [ [ 3.5, -3.5, -3.5 ], [ 3.5, 3.5, -3.5 ], [ 3.5, 3.5, 3.5 ], [ 3.5, -3.5, 3.5 ] ],
    [ [ -3.5, -3.5, -3.5 ], [ 3.5, -3.5, -3.5 ], [ 3.5, -3.5, 3.5 ], [ -3.5, -3.5, 3.5 ] ],
    [ [ -3.5, 3.5, -3.5 ], [ -3.5, 3.5, 3.5 ], [ 3.5, 3.5, 3.5 ], [ 3.5, 3.5, -3.5 ] ],
    [ [ -3.5, -3.5, -3.5 ], [ -3.5, 3.5, -3.5 ], [ 3.5, 3.5, -3.5 ], [ 3.5, -3.5, -3.5 ] ],
    [ [ -3.5, -3.5, 3.5 ], [ 3.5, -3.5, 3.5 ], [ 3.5, 3.5, 3.5 ], [ -3.5, 3.5, 3.5 ] ]
  ]

  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))

  // test center
  obs = cube({size: 3.5, center: [6.5, 6.5, 6.5]})
  pts = geom3.toPoints(obs)
  exp = [
    [ [ 3, 3, 3 ], [ 3, 3, 10 ], [ 3, 10, 10 ], [ 3, 10, 3 ] ],
    [ [ 10, 3, 3 ], [ 10, 10, 3 ], [ 10, 10, 10 ], [ 10, 3, 10 ] ],
    [ [ 3, 3, 3 ], [ 10, 3, 3 ], [ 10, 3, 10 ], [ 3, 3, 10 ] ],
    [ [ 3, 10, 3 ], [ 3, 10, 10 ], [ 10, 10, 10 ], [ 10, 10, 3 ] ],
    [ [ 3, 3, 3 ], [ 3, 10, 3 ], [ 10, 10, 3 ], [ 10, 3, 3 ] ],
    [ [ 3, 3, 10 ], [ 10, 3, 10 ], [ 10, 10, 10 ], [ 3, 10, 10 ] ]
  ]

  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))
})
