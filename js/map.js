export const map = L.map('map').setView([-15.793889, -47.882778], 4);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri'
}).addTo(map)

setTimeout(() => map.invalidateSize(), 300)

let marcadorAtual = null;
let areaAtual = null;

export function atualizarMapa(lat, lon, geojson) {
    map.setView([lat, lon], 15)

    if (marcadorAtual) map.removeLayer(marcadorAtual)
    marcadorAtual = L.marker([lat, lon]).addTo(map)

    if (areaAtual) map.removeLayer(areaAtual)

    if (geojson) {
        areaAtual = L.geoJSON(geojson, {
            style: { color: 'red', weight: 2, fillOpacity: 0.2 }
        }).addTo(map)
    } else {
        areaAtual = L.circle([lat, lon], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.3,
            radius: 500
        }).addTo(map)
    }
}