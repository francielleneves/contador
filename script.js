let contador = 0;

const valorDisplay = document.querySelector('#valor-contador');
const btnAdicionar = document.querySelector('#btn-adicionar');
const btnSubtrair = document.querySelector('#btn-subtrair');

btnAdicionar.onclick = function() {
    contador++; // Incrementar na variavel
    valorDisplay.innerText = contador; //Atualiza o valor em tela
}

btnSubtrair.onclick = function() {
    contador--; //decrementa a variavel
    valorDisplay.innerText = contador; //atualiza o valor em tela 
}

const inputNome = document.querySelector('#nome');
const btnEnviar = document.querySelector('#btn-enviar');
const feedback = document.querySelector('#feedback-msg');

btnEnviar.onclick = function(event) {
    event.preventDefault();

    const nomeDigitado = inputNome.value; //value é para pegar o valor do in

    if (nomeDigitado === '') {
        feedback.innerText = 'Erro! O campo nome não pode estar vazio!';
        feedback.style.color = 'red'; // Trocando a cor
    } else {
    feedback.innerText = 'Formulário enviado com sucesso!'
    feedback.style.color ='green';
    }
}