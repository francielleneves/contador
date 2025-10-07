// Aqui a gente "pega" alguns elementos do HTML pra poder usar no JavaScript:
const listaUsuarios = document.getElementById('lista-usuarios'); // é onde os nomes vão aparecer na tela
const form = document.getElementById('form-usuario'); // é o formulário que a pessoa preenche
const inputNome = document.getElementById('input-nome'); // é o campo onde a pessoa digita o nome

// Criamos uma "lista" (um array) que vai guardar os nomes das pessoas
let listaDeUsuarios = [];

// Essa função serve pra mostrar um nome novo na tela
function adicionarUsuarioNaLista(nome){
    const novoLi = document.createElement('li'); // cria um novo item da lista (li = list item)
    novoLi.textContent = `${nome}`;  // coloca o nome dentro desse item
    listaUsuarios.appendChild(novoLi); // coloca o item dentro da lista que aparece no HTML
}

// Essa função serve pra salvar os nomes no "localStorage"
// (um lugar do navegador que guarda informações mesmo depois de fechar a página)
function salvarUsuariosNoStorage() {
    localStorage.setItem('usuarios', JSON.stringify(listaDeUsuarios)); 
    // JSON.stringify transforma a lista em texto pra poder ser guardada
}

// Essa função serve pra "mostrar" todos os nomes na tela
function renderizarUsuarios() {
    listaUsuarios.innerHTML = ''; // apaga o que já estava na tela, pra não repetir
    listaDeUsuarios.forEach(usuario => { // percorre cada usuário da lista
        adicionarUsuarioNaLista(usuario.nome); // e chama a função que mostra o nome na tela
    });
}

// Essa função busca nomes prontos de uma "API" (um site que devolve dados prontos)
// É tipo pegar uma lista já feita da internet
function buscarUsuariosDaApi() {
    fetch('https://jsonplaceholder.typicode.com/users') // faz o pedido pro site
    .then(response => response.json()) // espera o site responder e transforma em formato de objeto
    .then(usuarios => { // quando chega a resposta...
        // cria uma lista com os nomes que vieram da internet
        listaDeUsuarios = usuarios.map(usuario => ({ nome: usuario.name }));
        renderizarUsuarios(); // mostra na tela
        salvarUsuariosNoStorage(); // e salva no navegador
    })
    .catch(erro => console.error('Erro ao buscar usuários:', erro)); // se der erro, mostra no console
}

// Aqui a gente diz o que fazer quando a pessoa clicar em "Enviar" no formulário
form.addEventListener('submit', function(event) {
    event.preventDefault(); // impede que a página recarregue (isso é padrão de formulários)
    const nomeDigitado = inputNome.value.trim(); // pega o nome que a pessoa digitou e tira os espaços extras

    if (nomeDigitado) { // se a pessoa digitou algo
        const novoUsuario = { nome: nomeDigitado }; // cria um "objeto" com o nome
        listaDeUsuarios.push(novoUsuario); // coloca esse novo nome dentro da lista
        renderizarUsuarios(); // mostra na tela
        salvarUsuariosNoStorage(); // guarda no localStorage
        inputNome.value = ''; // limpa o campo de texto pra digitar outro nome depois
    }
});

// Quando a página termina de carregar...
window.onload = function() {
    const usuariosSalvos = localStorage.getItem('usuarios'); // tenta pegar a lista que foi salva antes
    if(usuariosSalvos) { // se já tiver algo salvo
        listaDeUsuarios = JSON.parse(usuariosSalvos); // transforma o texto salvo em uma lista de verdade
        renderizarUsuarios(); // mostra na tela os nomes guardados
    } else {
        buscarUsuariosDaApi(); // se não tiver nada salvo, pega nomes da internet
    }
}