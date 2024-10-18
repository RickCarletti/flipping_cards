// Array para armazenar as cartas ativas
const activeCards = [];

// Função para gerar uma cor aleatória para a frente da carta
function getRandomColor() {
    const colors = ['blue', 'green', 'red'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Inicializa a lista de cartas disponíveis
function initializeCardList() {
    const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    const values = ['A', 'J', 'Q', 'K', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const colors = ['a1', 'a2', 'a3', 'a4', 'a5']

    const conexao_aceitacao = ['Abandono/Instabilidade', 'Desconfiança/Abuso', 'Privação Emocional', 'Defeito/Vergoña', 'Isolamento Social'];
    const autonomia_desempenho = ['Fracasso', 'Dependência/Incompetência', 'Vulnerabilidade à Dano ou Doença', 'Emaranhamento'];
    const limitacao = ['Autocontrole e Autodiciplina Insuficiente', 'Grandiosidade'];
    const orientacao_controle = ['Subjugação', 'Auto Sacrifício', 'Busca de Aprovação']
    const supervigilancia_inibicao = ['Inibição Emocional', 'Padrões Inflexiveis', 'Hipercriticidade', 'Carater Punitivo']

    debugger;

    cria_lista_cartas(conexao_aceitacao, colors[0], values, suits);
    cria_lista_cartas(autonomia_desempenho, colors[1], values, suits);
    cria_lista_cartas(limitacao, colors[2], values, suits);
    cria_lista_cartas(orientacao_controle, colors[3], values, suits);
    cria_lista_cartas(supervigilancia_inibicao, colors[4], values, suits);
}

const availableCards = document.getElementById('available-cards');
var i = 0;
var j = 0;
var l = 1;

function cria_lista_cartas(lista_cartas, color, values, suits) {
    var k = 1;

    lista_cartas.forEach(umEsquema => {
        const listItem = document.createElement('li');
        listItem.classList.add('card-item');
        listItem.classList.add(color);

        var value = values[i % 13];
        var suit = suits[j % 4];
        listItem.textContent = `${l}.${k}`;
        j++;
        i++;
        k++;
        
        listItem.title = `${umEsquema}`
        listItem.onclick = () => toggleCard(suit, value, listItem); // Passar listItem para a função
        availableCards.appendChild(listItem);
    });
    l++;
}

// Função para adicionar ou remover uma nova carta
function toggleCard(suit, value, listItem) {
    const cardIdentifier = `${suit}-${value}`; // Identificador único para cada carta

    if (activeCards.includes(cardIdentifier)) {
        // Se a carta já estiver na lista, removê-la
        removeCard(cardIdentifier);
        listItem.classList.remove('active'); // Remove a classe active do item da lista
    } else {
        // Caso contrário, adicionar a carta
        addCard(suit, value);
        activeCards.push(cardIdentifier); // Adicionar o identificador à lista
        listItem.classList.add('active'); // Adiciona a classe active ao item da lista
    }
}

// Função para adicionar uma nova carta
function addCard(suit, value) {
    const container = document.getElementById('card-container');

    // Criar os elementos da carta
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('onclick', 'flipCard(this)');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    const randomColor = getRandomColor();
    cardFront.classList.add('card-front', randomColor);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    // Gerar um verso de carta com o naipe e valor selecionados
    cardBack.style.backgroundImage = `url('cards/card${suit}${value}.png')`;

    // Montar a carta
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    // Define identificador
    card.setAttribute('data-identifier', `${suit}-${value}`); // Adiciona identificador à carta

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
