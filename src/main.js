import Map from './map'

const map = new Map(document.getElementById('map'), {
  worldSize: [2048 * 2, 2048 * 2],
})
map.add('-20,0', 'brown')
map.add('93-95,-108--106', '#f4b084')
map.add('-83--77,-80--74', '#eee')
map.add('-63--58,-63--58', '#ffff00')
map.add('1-3,-36--34', '#70ad47')
map.add('-43--30,-37--24', '#e2efda')
map.add('-61--48,-31--18', '#bdd7ee')
map.add('-18--16,-20--18', '#9bc2e6')
map.add('9,-11', '#002060')
map.add('-62--60,4-6', '#eee')
map.add('-60,9', '#eee')
map.add('-61--60,11-12', '#eee')
map.add('-58--57,14-15', '#eee')
map.add('-53--51,17', '#eee')
map.add('-53--49,18', '#eee')
map.add('-105--74,30', '#45B5E5')
map.add('-81--78,29-31', '#45B5E5')
map.add('-76--75,33', '#eee')
map.add('-49,22', '#eee')
map.add('-48--47,21-22', '#f4b084')
map.add('-38--37,24-31', '#fce4d6')
map.add('-26--19,26-28', '#ed7d31')
map.add('-13--8,19-24', '#a9d08e')
map.add('64-72,49-60', '#ff0000')
map.add('-67--51,41-46', '#eee')
map.add('-63--51,47-56', '#eee')
map.add('-9-1,68-77', '#9bc2e6')
map.add('27-45,75-102', '#ffc0cb')
map.add('64-74,104-123', '#00b0f0')

document.getElementById('zoom-in').addEventListener('click', () => {
  map.zoomIn()
})

document.getElementById('zoom-out').addEventListener('click', () => {
  map.zoomOut()
})
