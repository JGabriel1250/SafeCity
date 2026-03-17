# SafeCity — Registro de Modificações

## [1.0.0] - 2026-03-16

## Versão inicial → Versão atual

---

## HTML

### ✅ Adicionado

**CSS do Leaflet no `<head>`**
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css">
```
> Sem isso o mapa ficava quebrado em quadrados soltos que podiam ser arrastados pela tela.

---

### 🔀 Modificado

**Botão `#buscar` tirado de dentro do `#filtros`**
```html
<!-- ANTES -->
<div id="filtros">
    ...inputs...
    <button id="buscar">Buscar</button>
</div>

<!-- DEPOIS -->
<div id="filtros">
    ...inputs...
</div>
<button id="buscar">Buscar</button>
```
> Para o botão sempre ficar numa linha separada abaixo dos inputs em qualquer tamanho de tela.

---

**Typo corrigido no `name` do select de cidade**
```html
<!-- ANTES -->
<select name="cidad4e" id="cidade">

<!-- DEPOIS -->
<select name="cidade" id="cidade">
```
> Erro de digitação simples que poderia causar problemas ao enviar formulários.

---

## CSS

### 🔀 Modificado

**`header h1` — margin reduzido**
```css
/* ANTES */
margin-bottom: 80px;

/* DEPOIS */
margin: 20px 0 40px 0;
```
> 80px deixava um espaço enorme entre o título e os filtros.

---

**`select` e `#bairro` — largura fixa e cor do texto**
```css
/* ANTES */
width: 20%;

/* DEPOIS */
width: 200px;
color: #333;
```
> Largura em `%` causava inputs muito pequenos ou muito grandes dependendo da tela. Largura fixa em `px` é mais previsível.

---

**`#buscar` — simplificado**
```css
/* ANTES */
width: 30%;
max-width: 200px;
margin-top: 50px;
align-self: center;

/* DEPOIS */
margin-top: 20px;
margin-bottom: 15px;
```
> Removido o `width` porque o tamanho já estava bom. Reduzido o `margin-top` de 50px para 20px e adicionado `margin-bottom` para isolar o botão visualmente.

---

**`#map` — corrigido estouro lateral**
```css
/* ANTES */
width: 100%;
margin: 40px auto;

/* DEPOIS */
width: calc(100% - 40px);
max-width: 1200px;
margin: 30px auto 20px auto;
display: block;
```
> `width: 100%` causava estouro lateral da página. `calc(100% - 40px)` desconta o padding das laterais. `display: block` garante que o mapa não fique em modo inline.

---

**`footer` — removido `position: fixed`**
```css
/* ANTES */
position: fixed;
bottom: 0;
width: 100%;
background-color: rgba(0,0,0,0.3);

/* DEPOIS */
margin-top: 20px;
```
> O footer fixo ficava na frente do mapa e do conteúdo, atrapalhando o visual.

---

## JavaScript

### 🔀 Modificado

**Tile do mapa trocado**
```javascript
// ANTES — bloqueado com erro "Referer required"
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

// DEPOIS — sem restrição de Referer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}')
```
> O OpenStreetMap bloqueia requisições sem o cabeçalho `Referer`, que não é enviado ao abrir arquivos localmente.

---

**`setTimeout` aumentado de 100ms para 300ms**
```javascript
// ANTES
setTimeout(() => { map.invalidateSize() }, 100)

// DEPOIS
setTimeout(() => { map.invalidateSize() }, 300)
```
> 100ms era pouco tempo para o mapa terminar de carregar antes de chamar o `invalidateSize()`.

---

### ✅ Adicionado

**Lógica dos filtros e evento de clique**
```javascript
// Pega os elementos do HTML
const botaoBuscar = document.getElementById('buscar')
const selectEstado = document.getElementById('estado')
const selectCidade = document.getElementById('cidade')
const inputBairro = document.getElementById('bairro')

// Escuta o clique no botão
botaoBuscar.addEventListener('click', function() {
    const estadoEscolhido = selectEstado.value
    const cidadeEscolhida = selectCidade.value
    const bairroDigitado = inputBairro.value

    console.log('Estado:', estadoEscolhido)
    console.log('Cidade:', cidadeEscolhida)
    console.log('Bairro:', bairroDigitado)
})
```
> Toda essa parte foi construída do zero. O `addEventListener('click')` fica "escutando" o botão e executa a função quando clicado. Por enquanto apenas exibe os valores no console.

---

### 🐛 Bug corrigido

**Typo no evento de clique**
```javascript
// ANTES — evento nunca disparava
botaoBuscar.addEventListener("clcik", function() {

// DEPOIS — corrigido
botaoBuscar.addEventListener("click", function() {
```
> "clcik" não é um evento válido do JavaScript, então o botão nunca respondia ao clique.

---

## Legenda
| Símbolo | Significado |
|--------|-------------|
| ✅ | Adicionado |
| 🔀 | Modificado |
| ❌ | Removido |
| 🐛 | Bug corrigido |