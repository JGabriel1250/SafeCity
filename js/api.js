export async function carregarEstados(estUF) {
    const resposta = await fetch(estUF)
    return await resposta.json()
}

export async function carregarCidades(cidUF, uf) {
    const url = cidUF.replace("{UF}", uf)
    const resposta = await fetch(url)
    return await resposta.json()
}

export async function buscarLocal(busca) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(busca)}&format=json&polygon_geojson=1`
    const resposta = await fetch(url)
    return await resposta.json()
}
