const { vec3 } = require('../../math')

const { geom2, geom3, poly3 } = require('../../geometry')

/*
 * Create a polygon (wall) from the given Z values and side.
 */
const to3DWall = (z0, z1, side) => {
  const points = [
    vec3.fromVec2(side[0], z0),
    vec3.fromVec2(side[1], z0),
    vec3.fromVec2(side[1], z1),
    vec3.fromVec2(side[0], z1)
  ]
  return poly3.fromPoints(points)
}

/**
 * Create a set of polygons (walls) from the given Z values and geometry.
 *
 * @param {object} options - options with Z offsets
 * @param {geom2} geometry - geometry used as base of walls
 * @return {[poly3]} list of polygons
 */
const to3DWalls = (options, geometry) => {
  let sides = geom2.toSides(geometry)

  let polygons = sides.map((side) => to3DWall(options.z0, options.z1, side))

  let result = geom3.create(polygons)
  return result
}

module.exports = to3DWalls
