const DPR = window.devicePixelRatio || 1
const WORLD_BLOCK_WIDTH = 4096
const WORLD_BLOCK_HEIGHT = 4096
const PIXEL_SIZE = 2
const WORLD_CHUNK_WIDTH = WORLD_BLOCK_WIDTH / 16
const WORLD_CHUNK_HEIGHT = WORLD_BLOCK_HEIGHT / 16
const MAP_WIDTH = WORLD_CHUNK_WIDTH * PIXEL_SIZE
const MAP_HEIGHT = WORLD_CHUNK_HEIGHT * PIXEL_SIZE
const MAP_TOP_LEFT = [-WORLD_CHUNK_WIDTH / 2, -WORLD_CHUNK_HEIGHT / 2]

export default class Map {
  constructor (canvas) {
    canvas.width = (MAP_WIDTH + 2) * DPR
    canvas.height = (MAP_HEIGHT + 2) * DPR
    canvas.style.width = MAP_WIDTH + 2 + 'px'
    canvas.style.height = MAP_HEIGHT + 2 + 'px'
    this.ctx = canvas.getContext('2d')
    this.ctx.scale(DPR, DPR)
    this.ctx.strokeStyle = '#f0f'
    this.ctx.strokeRect(0, 0, MAP_WIDTH + 2, MAP_HEIGHT + 2)
    this.ctx.fillStyle = '#fff'
    this.ctx.fillRect(1, 1, MAP_WIDTH, MAP_HEIGHT)
  }

  markChunk (chunk, color) {
    const _chunk = parseChunk(chunk)
    this.ctx.fillStyle = color
    this.ctx.fillRect(
      (_chunk.x - MAP_TOP_LEFT[0]) * PIXEL_SIZE + 1,
      (_chunk.z - MAP_TOP_LEFT[1]) * PIXEL_SIZE + 1,
      _chunk.w * PIXEL_SIZE,
      _chunk.h * PIXEL_SIZE,
    )
  }
}

function parseChunk (exp) {
  const [x1, x2, z1, z2] = /^(-?\d+)(?:-(-?\d+))?,(-?\d+)(?:-(-?\d+))?$/.exec(exp).slice(1).map(t => t === undefined ? t : +t)
  return {
    x: x1,
    z: z1,
    w: x2 === undefined ? 1 : x2 - x1 + 1,
    h: z2 === undefined ? 1 : z2 - z1 + 1,
  }
}
