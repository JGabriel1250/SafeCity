import { carregarEstados, carregarCidades, buscarLocal } from "./api.js";
import { map, atualizarMapa } from "./map.js";
import { preencherEstados, preencherCidades, mostrarDadosCidade } from "./ui.js";


const estUF = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
const cidUF = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios";

const botaoBuscar = document.getElementById('buscar');
const selectEstado = document.getElementById('estado');
const selectCidade = document.getElementById('cidade');
const inputBairro = document.getElementById('bairro');

(async () => {
    const estados = await carregarEstados(estUF);
    preencherEstados(selectEstado, estados);
})();

selectEstado.addEventListener("change", async () => {
    const uf = selectEstado.value;
    const cidades = await carregarCidades(cidUF, uf);
    preencherCidades(selectCidade, cidades);
});

botaoBuscar.addEventListener("click", async () => {
    const estadoNome = selectEstado.options[selectEstado.selectedIndex].text;
    const cidadeNome = selectCidade.options[selectCidade.selectedIndex].text;
    const bairroNome = inputBairro.value.trim();

    if (!cidadeNome || cidadeNome === "Selecione") {
        alert("Selecione uma cidade");
        return;
    }

    if (bairroNome) {
        const busca = `${bairroNome}, ${cidadeNome}, ${estadoNome}`;
        const data = await buscarLocal(busca);

        if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            atualizarMapa(lat, lon, data[0].geojson);
        } else {
            alert("Local não encontrado");
        }
    } else {
        mostrarDadosCidade(cidadeNome);
    }
});
