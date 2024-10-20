// Array para armazenar as cartas ativas
const activeCards = [];
const listAvailableImages = ['1.1', '1.2', '1.3', '1.4', '1.5', '2.1', '2.2', '2.3', '2.4', '3.1', '3.2', '4.1', '4.2', '4.3', '5.1', '5.2', '5.3', '5.4']

// Função para gerar uma cor aleatória para a frente da carta
function getRandomColor() {
    const colors = ['blue', 'green', 'red'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Inicializa a lista de cartas disponíveis
function initializeCardList() {
    const colors = ['a1', 'a2', 'a3', 'a4', 'a5']

    const conexao_aceitacao = ['Abandono', 'Desconfiança/Abuso', 'Privação Emocional', 'Defectividade', 'Isolamento Social'];
    const autonomia_desempenho = ['Incompetência e Dependência', 'Vulnerabilidade ao Perigo ou Doença', 'Emaranhamento', 'Fracasso'];
    const limitacao = ['Grandiosidade e Arrogo', 'Autocontrole e Autodisciplina Insuficientes'];
    const orientacao_controle = ['Subjugação', 'Autossacrifício', 'Busca de Aprovação'];
    const supervigilancia_inibicao = ['Inibição Emocional', 'Padrões Inflexíveis/Criticismo', 'Negativismo/Pessimismo', 'Postura Punitiva'];

    cria_botao_remove_todos();
    cria_lista_cartas(conexao_aceitacao, colors[0]);
    cria_lista_cartas(autonomia_desempenho, colors[1]);
    cria_lista_cartas(limitacao, colors[2]);
    cria_lista_cartas(orientacao_controle, colors[3]);
    cria_lista_cartas(supervigilancia_inibicao, colors[4]);
}

const availableCards = document.getElementById('available-cards');
var l = 1;

function cria_lista_cartas(lista_cartas, color) {
    var k = 1;

    lista_cartas.forEach(umEsquema => {
        const listItem = document.createElement('li');
        listItem.classList.add('card-item');
        listItem.classList.add(color);

        listItem.textContent = `${l}.${k}`;
        listItem.title = `${umEsquema}`
        listItem.setAttribute('lista', l)
        listItem.setAttribute('numero', k)
        listItem.onclick = () => toggleCard(listItem); // Passar listItem para a função
        availableCards.appendChild(listItem);
        k++;
    });
    l++;
}

function cria_botao_remove_todos() {
    const listItem = document.createElement('li');
    listItem.classList.add('card-item');
    listItem.classList.add('remove_all');

    listItem.textContent = `X`;
    listItem.title = `Remove Todas as Cartas`
    listItem.onclick = () => removeAll(); // Passar listItem para a função
    availableCards.appendChild(listItem);
}

function removeAll() {
    var listItensActives = document.getElementsByClassName("active");

    while(listItensActives.length > 0){
        toggleCard(listItensActives[0]);
    }

}

// Função para adicionar ou remover uma nova carta
function toggleCard(listItem) {
    const lista = listItem.getAttribute('lista')
    const numero = listItem.getAttribute('numero')
    const cardIdentifier = `${lista}-${numero}`; // Identificador único para cada carta

    if (activeCards.includes(cardIdentifier)) {
        // Se a carta já estiver na lista, removê-la
        removeCard(cardIdentifier);
        listItem.classList.remove('active'); // Remove a classe active do item da lista
    } else {
        // Caso contrário, adicionar a carta
        addCard(lista, numero);
        activeCards.push(cardIdentifier); // Adicionar o identificador à lista
        listItem.classList.add('active'); // Adiciona a classe active ao item da lista
    }
}

// Função para adicionar uma nova carta
async function addCard(lista, numero) {
    const container = document.getElementById('card-container');

    // Criar os elementos da carta
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('onclick', 'flipCard(this)');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    if (listAvailableImages.includes(`${lista}.${numero}`)) {
        // Gerar a frente de carta
        cardFront.style.backgroundImage = `url('cards/${lista}.${numero}_frente.png')`;
    }

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    // Gerar o verso de carta
    if (listAvailableImages.includes(`${lista}.${numero}`)) {
        cardBack.style.backgroundImage = `url('cards/${lista}.${numero}_verso.png')`;
    }

    // Montar a carta
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    // Define identificador
    card.setAttribute('data-identifier', `${lista}-${numero}`); // Adiciona identificador à carta

    // Adicionar ao container
    container.appendChild(card);

    // Adicionar animação de entrada
    card.style.animation = 'slide-in 0.5s forwards'; // Use a animação slide-in
}

// Função para remover uma carta
function removeCard(cardIdentifier) {
    const container = document.getElementById('card-container');
    const cards = container.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        // Verifica se a carta corresponde ao identificador
        if (card.getAttribute('data-identifier') === cardIdentifier) {
            card.style.animation = 'slide-out 0.5s forwards'; // Use a animação slide-in
            setTimeout(() => {
                container.removeChild(card); // Remove a carta do container
                activeCards.splice(activeCards.indexOf(cardIdentifier), 1); // Remove o identificador da lista
            }, "500");
            break;
        }
    }
}

// Função para virar a carta
function flipCard(card) {
    card.classList.toggle('is-flipped');
}

// Inicializa a listagem de cartas disponíveis ao carregar a página
initializeCardList();
