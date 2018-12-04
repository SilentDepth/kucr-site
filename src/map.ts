const DPR = window.devicePixelRatio || 1

export default class Map {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  worldSize: [number, number]
  pixelSize: number

  data = [] as Region[]

  get worldChunkSize () {
    return this.worldSize.map(n => Math.ceil(n / 16))
  }

  get mapSize () {
    return this.worldChunkSize.map(n => n * this.pixelSize)
  }

  get mapTLOffset () {
    return this.worldChunkSize.map(n => -n / 2)
  }

  constructor (canvas: HTMLCanvasElement, options = {} as MapOptions) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.ctx.scale(DPR, DPR)

    this.worldSize = [...(options.worldSize || [4800, 4800])] as [number, number]
    this.pixelSize = options.pixelSize || 2

    this.render()
  }

  render () {
    // canvas has an 1px border
    const canvasSize = this.mapSize.map(n => n + 2)
    this.canvas.width = canvasSize[0] * DPR
    this.canvas.height = canvasSize[1] * DPR
    this.canvas.style.width = canvasSize[0] + 'px'
    this.canvas.style.height = canvasSize[1] + 'px'

    this.ctx.strokeStyle = '#f0f'
    this.ctx.strokeRect(0, 0, canvasSize[0], canvasSize[1])

    this.clear()
    for (const r of this.data) {
      this.renderRegion(r)
    }
  }

  clear () {
    this.ctx.fillStyle = '#fff'
    this.ctx.fillRect(1, 1, this.mapSize[0], this.mapSize[1])
  }

  add (region: string, color: string) {
    const r = {region, color} as Region
    this.data.push(r)
    this.renderRegion(r)
  }

  renderRegion ({region, color}: Region) {
    const _chunk = parseChunk(region)
    this.ctx.fillStyle = color
    this.ctx.fillRect(
      (_chunk.x - this.mapTLOffset[0]) * this.pixelSize + 1,
      (_chunk.z - this.mapTLOffset[1]) * this.pixelSize + 1,
      _chunk.w * this.pixelSize,
      _chunk.h * this.pixelSize,
    )
  }

  zoomIn () {
    this.pixelSize++
    this.render()
  }

  zoomOut () {
    if (this.pixelSize === 1) return
    this.pixelSize--
    this.render()
  }
}

function parseChunk (exp: string) {
  const [x1, x2, z1, z2] = /^(-?\d+)(?:-(-?\d+))?,(-?\d+)(?:-(-?\d+))?$/.exec(exp)!.slice(1).map(t => t === undefined ? t : +t)
  return {
    x: x1,
    z: z1,
    w: x2 === undefined ? 1 : x2 - x1 + 1,
    h: z2 === undefined ? 1 : z2 - z1 + 1,
  }
}

interface MapOptions {
  worldSize: [number, number]
  pixelSize: number
}

interface Region {
  region: string
  color: string
}

type RegionLiteral = [string, string, string?]
