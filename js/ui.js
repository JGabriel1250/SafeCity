export function preencherEstados(selectEstado, estados) {
    estados.forEach(estado => {
        const option = document.createElement("option");
        option.value = estado.id;
        option.textContent = estado.nome;
        selectEstado.appendChild(option);
    });
}

export function preencherCidades(selectCidade, cidades) {
    selectCidade.innerHTML = '<option>Selecione</option>';
    cidades.forEach(cidade => {
        const option = document.createElement("option");
        option.value = cidade.nome;
        option.textContent = cidade.nome;
        selectCidade.appendChild(option);
    });
}

export function mostrarDadosCidade(cidade) {
    const div = document.getElementById("ocorrencias");
    if (!div) return;

    const dados = {
        total: Math.floor(Math.random() * 100),
        roubos: Math.floor(Math.random() * 50),
        furtos: Math.floor(Math.random() * 50)
    };

    div.innerHTML = `
        <h3>Dados de segurança - ${cidade}</h3>
        <p>Total: ${dados.total}</p>
        <p>Roubos: ${dados.roubos}</p>
        <p>Furtos: ${dados.furtos}</p>
    `;
}
