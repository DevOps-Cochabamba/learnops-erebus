import h337 from 'heatmap.js'

export function startHeatmap() {
  const heatmap = h337.create({
    container: document.getElementById('heatmapContainer'),
    maxOpacity: 1,
    radius: 30,
    blur: .90,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  })

  const heatmapContainer = document.getElementById('heatmapContainerWrapper')
  
  heatmapContainer.onmousemove = heatmapContainer.ontouchmove = (event) => {
    event.preventDefault()
    let x = event.layerX
    let y = event.layerY
    if (event.touches) {
      x = event.touches[0].pageX
      y = event.touches[0].pageY
    }
    heatmap.addData({ x, y, value: 25 })
  }

  heatmapContainer.onclick = (event) => {
    const x = event.layerX
    const y = event.layerY
    heatmap.addData({ x, y, value: 30 })
    console.log(x, y, '<<<<<<< DATA')
  }

  return heatmap
}