const estUF = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
const cidUF = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios"
const bairUF = "https://servicodados.ibge.gov.br/api/v1/localidades/distritos/{id}/subdistritos"


const map = L.map('map').setView([-15.793889, -47.882778], 4)

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri'
}).addTo(map)


// Isso resolve o problema dos quadrados quebrados
setTimeout(() => {
    map.invalidateSize()
}, 300)

// Pega o botão de buscar do HTM
const botaoBuscar = document.getElementById('buscar')

// Pega os selects e o input do HTML
const selectEstado = document.getElementById('estado')
const selectCidade = document.getElementById('cidade')
const inputBairro = document.getElementById('bairro')

// variável global para guardar o último marcador

let marcadorAtual = null

// Quando o usuário clicar no botão buscar, executa essa função
botaoBuscar.addEventListener("click", function() {

    const estadoNome = selectEstado.options[selectEstado.selectedIndex].text
    const cidadeNome = selectCidade.options[selectCidade.selectedIndex].text
    const bairroNome = inputBairro.value

    const busca = `${bairroNome}, ${cidadeNome}, ${estadoNome}`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(busca)}&format=json`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat
                const lon = data[0].lon
                map.setView([lat, lon], 15)

                if (marcadorAtual) {
                    map.removeLayer(marcadorAtual)
                }

                marcadorAtual = L.marker([lat, lon]).addTo(map)
            } else {
                alert("Local não encontrado")
            }
        })

})

function carregarEstados() {
    fetch(estUF)
        .then(resposta => resposta.json())
        .then(dados => {
            dados.forEach(estado => {
                const option = document.createElement("option")
                option.value = estado.id
                option.textContent = estado.nome
                selectEstado.appendChild(option) 
            })
        })
}

selectEstado.addEventListener("change", function() {
    const uf = selectEstado.value

    const url = cidUF.replace("{UF}", uf)

    selectCidade.innerHTML = '<option>Selecione</option>'

    fetch(url)
        .then(resposta => resposta.json())
        .then(dados => {
            dados.forEach(cidade => {
                const option = document.createElement("option")
                option.value = cidade.nome
                option.textContent = cidade.nome
                selectCidade.appendChild(option)
            })
        })
})


carregarEstados();

