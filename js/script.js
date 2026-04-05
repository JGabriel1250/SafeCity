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

// Quando o usuário clicar no botão buscar, executa essa função
botaoBuscar.addEventListener("click", function() {

    // Pega o texto que o usuário escolheu/digitou
    const estadoEscolhido = selectEstado.value
    const cidadeEscolhida = selectCidade.value
    const bairroDigitado = inputBairro.value

})

function carregarEstados() {
    $.getJSON(estUF, function(data) {
        let conteudo = '';
        $.each(data, function(i, val) {
            conteudo += `<option value="${val.id}">${val.nome}</option>`;
        });
        // Corrigido para #estado (igual ao HTML)
        $("#estado").append(conteudo);
    });
}

carregarEstados();
