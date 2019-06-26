const test = require('ava')

const {degToRad} = require('../../math/utils')

const {geom2, geom3} = require('../../geometry')

const extrudeLinear = require('./extrudeLinear')

const comparePolygonsAsPoints = require('../../../test/helpers/comparePolygonsAsPoints')

test('extrudeLinear (defaults)', t => {
  let geometry2 = geom2.fromPoints([[5, 5], [-5, 5], [-5, -5], [5, -5]])

  let geometry3 = extrudeLinear({}, geometry2)
  let pts = geom3.toPoints(geometry3)
  let exp = [
    [[5.0, -5.0, 0.0], [5.0, 5.0, 0.0], [5.0, 5.0, 1.0]],
    [[5.0, -5.0, 0.0], [5.0, 5.0, 1.0], [5.0, -5.0, 1.0]],
    [[5.0, 5.0, 0.0], [-5.0, 5.0, 0.0], [-5.0, 5.0, 1.0]],
    [[5.0, 5.0, 0.0], [-5.0, 5.0, 1.0], [5.0, 5.0, 1.0]],
    [[-5.0, 5.0, 0.0], [-5.0, -5.0, 0.0], [-5.0, -5.0, 1.0]],
    [[-5.0, 5.0, 0.0], [-5.0, -5.0, 1.0], [-5.0, 5.0, 1.0]],
    [[-5.0, -5.0, 0.0], [5.0, -5.0, 0.0], [5.0, -5.0, 1.0]],
    [[-5.0, -5.0, 0.0], [5.0, -5.0, 1.0], [-5.0, -5.0, 1.0]],
    [[-5.0, -5.0, 1.0], [5.0, -5.0, 1.0], [5.0, 5.0, 1.0], [-5.0, 5.0, 1.0]],
    [[-5.0, -5.0, 0.0], [-5.0, 5.0, 0.0], [5.0, 5.0, 0.0], [5.0, -5.0, 0.0]]
  ]
  t.is(pts.length, 10)
  t.true(comparePolygonsAsPoints(pts, exp))
})

test('extrudeLinear (no twist)', t => {
  let geometry2 = geom2.fromPoints([[5, 5], [-5, 5], [-5, -5], [5, -5]])

  let geometry3 = extrudeLinear({offset: [5, 5, 15]}, geometry2)
  let pts = geom3.toPoints(geometry3)
  let exp = [
    [[5.0, -5.0, 0.0], [5.0, 5.0, 0.0], [10.0, 10.0, 15.0]],
    [[5.0, -5.0, 0.0], [10.0, 10.0, 15.0], [10.0, 0.0, 15.0]],
    [[5.0, 5.0, 0.0], [-5.0, 5.0, 0.0], [0.0, 10.0, 15.0]],
    [[5.0, 5.0, 0.0], [0.0, 10.0, 15.0], [10.0, 10.0, 15.0]],
    [[-5.0, 5.0, 0.0], [-5.0, -5.0, 0.0], [0.0, 0.0, 15.0]],
    [[-5.0, 5.0, 0.0], [0.0, 0.0, 15.0], [0.0, 10.0, 15.0]],
    [[-5.0, -5.0, 0.0], [5.0, -5.0, 0.0], [10.0, 0.0, 15.0]],
    [[-5.0, -5.0, 0.0], [10.0, 0.0, 15.0], [0.0, 0.0, 15.0]],
    [[0.0, 0.0, 15.0], [10.0, 0.0, 15.0], [10.0, 10.0, 15.0], [0.0, 10.0, 15.0]],
    [[-5.0, -5.0, 0.0], [-5.0, 5.0, 0.0], [5.0, 5.0, 0.0], [5.0, -5.0, 0.0]]
  ]
  t.is(pts.length, 10)
  t.true(comparePolygonsAsPoints(pts, exp))

  geometry3 = extrudeLinear({offset: [-5, -5, -15]}, geometry2)
  pts = geom3.toPoints(geometry3)
  exp = [
    [[5.0, 5.0, 0.0], [5.0, -5.0, 0.0], [0.0, -10.0, -15.0]],
    [[5.0, 5.0, 0.0], [0.0, -10.0, -15.0], [0.0, 0.0, -15.0]],
    [[-5.0, 5.0, 0.0], [5.0, 5.0, 0.0], [0.0, 0.0, -15.0]],
    [[-5.0, 5.0, 0.0], [0.0, 0.0, -15.0], [-10.0, 0.0, -15.0]],
    [[-5.0, -5.0, 0.0], [-5.0, 5.0, 0.0], [-10.0, 0.0, -15.0]],
    [[-5.0, -5.0, 0.0], [-10.0, 0.0, -15.0], [-10.0, -10.0, -15.0]],
    [[5.0, -5.0, 0.0], [-5.0, -5.0, 0.0], [-10.0, -10.0, -15.0]],
    [[5.0, -5.0, 0.0], [-10.0, -10.0, -15.0], [0.0, -10.0, -15.0]],
    [[-10.0, -10.0, -15.0], [-10.0, 0.0, -15.0], [0.0, 0.0, -15.0], [0.0, -10.0, -15.0]],
    [[-5.0, -5.0, 0.0], [5.0, -5.0, 0.0], [5.0, 5.0, 0.0], [-5.0, 5.0, 0.0]]
  ]
  t.is(pts.length, 10)
  t.true(comparePolygonsAsPoints(pts, exp))
})

test('extrudeLinear (twist)', t => {
  let geometry2 = geom2.fromPoints([[5, 5], [-5, 5], [-5, -5], [5, -5]])

  let geometry3 = extrudeLinear({offset: [0, 0, 15], twistangle: degToRad(-45)}, geometry2)
  let pts = geom3.toPoints(geometry3)
  let exp = [
    [ [ 5, -5, 0 ], [ 5, 5, 0 ], [ 7.071067810058594, 0, 15 ] ],
    [ [ 5, -5, 0 ], [ 7.071067810058594, 0, 15 ], [ 0, -7.071067810058594, 15 ] ],
    [ [ 5, 5, 0 ], [ -5, 5, 0 ], [ 0, 7.071067810058594, 15 ] ],
    [ [ 5, 5, 0 ], [ 0, 7.071067810058594, 15 ], [ 7.071067810058594, 0, 15 ] ],
    [ [ -5, 5, 0 ], [ -5, -5, 0 ], [ -7.071067810058594, 0, 15 ] ],
    [ [ -5, 5, 0 ], [ -7.071067810058594, 0, 15 ], [ 0, 7.071067810058594, 15 ] ],
    [ [ -5, -5, 0 ], [ 5, -5, 0 ], [ 0, -7.071067810058594, 15 ] ],
    [ [ -5, -5, 0 ], [ 0, -7.071067810058594, 15 ], [ -7.071067810058594, 0, 15 ] ],
    [ [ -7.071067810058594, 0, 15 ], [ 0, -7.071067810058594, 15 ],
      [ 7.071067810058594, 0, 15 ], [ 0, 7.071067810058594, 15 ] ],
    [ [ -5, -5, 0 ], [ -5, 5, 0 ],
      [ 5, 5, 0 ], [ 5, -5, 0 ] ]
  ]
  t.is(pts.length, 10)
  t.true(comparePolygonsAsPoints(pts, exp))

  geometry3 = extrudeLinear({offset: [0, 0, 15], twistangle: degToRad(90), twiststeps: 3}, geometry2)
  pts = geom3.toPoints(geometry3)
  exp = [
    [ [ 5, -5, 0 ], [ 5, 5, 0 ], [ 1.8301270008087158, 6.830126762390137, 5 ] ],
    [ [ 5, -5, 0 ], [ 1.8301270008087158, 6.830126762390137, 5 ], [ 6.830126762390137, -1.8301270008087158, 5 ] ],
    [ [ 5, 5, 0 ], [ -5, 5, 0 ], [ -6.830126762390137, 1.8301270008087158, 5 ] ],
    [ [ 5, 5, 0 ], [ -6.830126762390137, 1.8301270008087158, 5 ], [ 1.8301270008087158, 6.830126762390137, 5 ] ],
    [ [ -5, 5, 0 ], [ -5, -5, 0 ], [ -1.8301270008087158, -6.830126762390137, 5 ] ],
    [ [ -5, 5, 0 ], [ -1.8301270008087158, -6.830126762390137, 5 ], [ -6.830126762390137, 1.8301270008087158, 5 ] ],
    [ [ -5, -5, 0 ], [ 5, -5, 0 ], [ 6.830126762390137, -1.8301270008087158, 5 ] ],
    [ [ -5, -5, 0 ], [ 6.830126762390137, -1.8301270008087158, 5 ], [ -1.8301270008087158, -6.830126762390137, 5 ] ],
    [ [ 6.830126762390137, -1.8301270008087158, 5 ], [ 1.8301270008087158, 6.830126762390137, 5 ], [ -1.8301270008087158, 6.830126762390137, 10 ] ],
    [ [ 6.830126762390137, -1.8301270008087158, 5 ], [ -1.8301270008087158, 6.830126762390137, 10 ], [ 6.830126762390137, 1.8301270008087158, 10 ] ],
    [ [ 1.8301270008087158, 6.830126762390137, 5 ], [ -6.830126762390137, 1.8301270008087158, 5 ], [ -6.830126762390137, -1.8301270008087158, 10 ] ],
    [ [ 1.8301270008087158, 6.830126762390137, 5 ], [ -6.830126762390137, -1.8301270008087158, 10 ], [ -1.8301270008087158, 6.830126762390137, 10 ] ],
    [ [ -6.830126762390137, 1.8301270008087158, 5 ], [ -1.8301270008087158, -6.830126762390137, 5 ], [ 1.8301270008087158, -6.830126762390137, 10 ] ],
    [ [ -6.830126762390137, 1.8301270008087158, 5 ], [ 1.8301270008087158, -6.830126762390137, 10 ], [ -6.830126762390137, -1.8301270008087158, 10 ] ],
    [ [ -1.8301270008087158, -6.830126762390137, 5 ], [ 6.830126762390137, -1.8301270008087158, 5 ], [ 6.830126762390137, 1.8301270008087158, 10 ] ],
    [ [ -1.8301270008087158, -6.830126762390137, 5 ], [ 6.830126762390137, 1.8301270008087158, 10 ], [ 1.8301270008087158, -6.830126762390137, 10 ] ],
    [ [ 6.830126762390137, 1.8301270008087158, 10 ], [ -1.8301270008087158, 6.830126762390137, 10 ], [ -5, 5, 15 ] ],
    [ [ 6.830126762390137, 1.8301270008087158, 10 ], [ -5, 5, 15 ], [ 5, 5, 15 ] ],
    [ [ -1.8301270008087158, 6.830126762390137, 10 ], [ -6.830126762390137, -1.8301270008087158, 10 ], [ -5, -5, 15 ] ],
    [ [ -1.8301270008087158, 6.830126762390137, 10 ], [ -5, -5, 15 ], [ -5, 5, 15 ] ],
    [ [ -6.830126762390137, -1.8301270008087158, 10 ], [ 1.8301270008087158, -6.830126762390137, 10 ], [ 5, -5, 15 ] ],
    [ [ -6.830126762390137, -1.8301270008087158, 10 ], [ 5, -5, 15 ], [ -5, -5, 15 ] ],
    [ [ 1.8301270008087158, -6.830126762390137, 10 ], [ 6.830126762390137, 1.8301270008087158, 10 ], [ 5, 5, 15 ] ],
    [ [ 1.8301270008087158, -6.830126762390137, 10 ], [ 5, 5, 15 ], [ 5, -5, 15 ] ],
    [ [ 5, -5, 15 ], [ 5, 5, 15 ],
      [ -5, 5, 15 ], [ -5, -5, 15 ] ],
    [ [ -5, -5, 0 ], [ -5, 5, 0 ],
      [ 5, 5, 0 ], [ 5, -5, 0 ] ]
  ]
  t.is(pts.length, 26)
  t.true(comparePolygonsAsPoints(pts, exp))

  geometry3 = extrudeLinear({offset: [5, 5, 15], twistangle: degToRad(90), twiststeps: 30}, geometry2)
  pts = geom3.toPoints(geometry3)
  t.is(pts.length, 242)
})

test('extrudeLinear (holes)', t => {
  let geometry2 = geom2.create([
    [[-5.00000,5.00000], [-5.00000,-5.00000]],
    [[-5.00000,-5.00000], [5.00000,-5.00000]],
    [[5.00000,-5.00000], [5.00000,5.00000]],
    [[5.00000,5.00000], [-5.00000,5.00000]],
    [[-2.00000,-2.00000], [-2.00000,2.00000]],
    [[2.00000,-2.00000], [-2.00000,-2.00000]],
    [[2.00000,2.00000], [2.00000,-2.00000]],
    [[-2.00000,2.00000], [2.00000,2.00000]]
  ])
  let geometry3 = extrudeLinear({offset: [0, 0, 15]}, geometry2)
  let pts = geom3.toPoints(geometry3)
  let exp = [
    [ [ -5, 5, 0 ], [ -5, -5, 0 ], [ -5, -5, 15 ] ],
    [ [ -5, 5, 0 ], [ -5, -5, 15 ], [ -5, 5, 15 ] ],
    [ [ -5, -5, 0 ], [ 5, -5, 0 ], [ 5, -5, 15 ] ],
    [ [ -5, -5, 0 ], [ 5, -5, 15 ], [ -5, -5, 15 ] ],
    [ [ 5, -5, 0 ], [ 5, 5, 0 ], [ 5, 5, 15 ] ],
    [ [ 5, -5, 0 ], [ 5, 5, 15 ], [ 5, -5, 15 ] ],
    [ [ 5, 5, 0 ], [ -5, 5, 0 ], [ -5, 5, 15 ] ],
    [ [ 5, 5, 0 ], [ -5, 5, 15 ], [ 5, 5, 15 ] ],
    [ [ -2, -2, 0 ], [ -2, 2, 0 ], [ -2, 2, 15 ] ],
    [ [ -2, -2, 0 ], [ -2, 2, 15 ], [ -2, -2, 15 ] ],
    [ [ 2, -2, 0 ], [ -2, -2, 0 ], [ -2, -2, 15 ] ],
    [ [ 2, -2, 0 ], [ -2, -2, 15 ], [ 2, -2, 15 ] ],
    [ [ 2, 2, 0 ], [ 2, -2, 0 ], [ 2, -2, 15 ] ],
    [ [ 2, 2, 0 ], [ 2, -2, 15 ], [ 2, 2, 15 ] ],
    [ [ -2, 2, 0 ], [ 2, 2, 0 ], [ 2, 2, 15 ] ],
    [ [ -2, 2, 0 ], [ 2, 2, 15 ], [ -2, 2, 15 ] ],
    [ [ -2, 5, 15 ], [ -5, 5, 15 ], [ -5, -5, 15 ], [ -2, -5, 15 ] ],
    [ [ 5, -2, 15 ], [ -2, -2, 15 ], [ -2, -5, 15 ], [ 5, -5, 15 ] ],
    [ [ 2, -2, 15 ], [ 5, -2, 15 ], [ 5, 5, 15 ], [ 2, 5, 15 ] ],
    [ [ 2, 2, 15 ], [ 2, 5, 15 ], [ -2, 5, 15 ], [ -2, 2, 15 ] ],
    [ [ -2, 5, 0 ], [ -2, -5, 0 ], [ -5, -5, 0 ], [ -5, 5, 0 ] ],
    [ [ -2, -2, 0 ], [ 5, -2, 0 ], [ 5, -5, 0 ], [ -2, -5, 0 ] ],
    [ [ 2, -2, 0 ], [ 2, 5, 0 ], [ 5, 5, 0 ], [ 5, -2, 0 ] ],
    [ [ 2, 2, 0 ], [ -2, 2, 0 ], [ -2, 5, 0 ], [ 2, 5, 0 ] ]
  ]
  t.is(pts.length, 24)
  t.true(comparePolygonsAsPoints(pts, exp))
})
