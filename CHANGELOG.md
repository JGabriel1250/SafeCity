# 🗺️ SafeCity — Registro de Modificações

## [2.0.0] - 2026-04-08

## Versão anterior → Versão atual (mapa interativo com geocoding e destaque de área)

---

## HTML

### 🔀 Modificado

**Campo de bairro ajustado**
```html
<!-- ANTES -->
<input type="text" name="bairro" id="bairro" placeholder="Digite o Bairro">

<!-- DEPOIS -->
<input type="text" id="bairro" placeholder="Digite um bairro">

Simplificação do input e padronização do placeholder.

✅ Adicionado

Importação do jQuery

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

Biblioteca adicionada, porém ainda não utilizada no projeto.

CSS
🔀 Modificado

Largura do mapa alterada

/* ANTES */
width: calc(100% - 40px);

/* DEPOIS */
width: calc(100% - 40%);

Alteração para porcentagem, podendo gerar comportamento inconsistente dependendo da tela.

⚠️ Observação

O uso de calc(100% - 40%) pode causar problemas de layout. O ideal é usar 100% com padding ou margem controlada.

JavaScript
✅ Adicionado

Integração com API de Geocoding (Nominatim)

const busca = `${bairroNome}, ${cidadeNome}, ${estadoNome}`;
const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(busca)}&format=json&polygon_geojson=1`

Converte endereço em coordenadas geográficas.

✅ Adicionado

Uso de encodeURIComponent

encodeURIComponent(busca)

Evita erro na URL com espaços e caracteres especiais.

✅ Adicionado

Centralização dinâmica do mapa

map.setView([lat, lon], 15)

Move o mapa para o local buscado.

✅ Adicionado

Marcador dinâmico

marcadorAtual = L.marker([lat, lon]).addTo(map)

Mostra o ponto no mapa.

✅ Adicionado

Controle de marcador único

let marcadorAtual = null

if (marcadorAtual) {
    map.removeLayer(marcadorAtual)
}

Evita acumular vários marcadores.

✅ Adicionado

Controle de área destacada

let areaAtual = null

if (areaAtual) {
    map.removeLayer(areaAtual)
}

Evita sobreposição de áreas.

✅ Adicionado

Destaque territorial com GeoJSON

if (data[0].geojson !== undefined) {
    areaAtual = L.geoJSON(data[0].geojson, {
        style: {
            color: 'red',
            weight: 2,
            fillOpacity: 0.2
        }
    }).addTo(map)
}

Desenha o território do local.

✅ Adicionado

Fallback com círculo

areaAtual = L.circle([lat, lon], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.3,
    radius: 500
}).addTo(map)

Usado quando não há GeoJSON disponível.

🔀 Modificado

Uso do texto dos selects

const estadoNome = selectEstado.options[selectEstado.selectedIndex].text
const cidadeNome = selectCidade.options[selectCidade.selectedIndex].text

Necessário para montar a busca corretamente.

⚠️ Observações Técnicas
Falta .catch() para erro de requisição
Falta validação dos campos
Uso fixo de data[0] pode não ser o melhor resultado
🧠 Evolução do Projeto
Antes
Mapa estático
Apenas console.log
Agora
API do IBGE integrada
API Nominatim integrada
Busca por endereço funcional
Mapa dinâmico
Marcador inteligente
Destaque de área com GeoJSON
Fallback com círculo
Controle de estado (marker + área)
Legenda
Símbolo	Significado
✅	Adicionado
🔀	Modificado
❌	Removido
🐛	Bug corrigido
⚠️	Observação técnica