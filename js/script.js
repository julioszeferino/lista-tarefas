// Recuperando o Input
let input = document.querySelector('input[name=tarefa]');

// Recuperar o Button
let btn = document.querySelector('#botao');

// Recuperar a lista
let lista = document.querySelector('#lista');

// Recuperando a div principal
let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // tenta buscar o bd ou retorna um array vazio

function renderizarTarefas(){
    // limpar a listagem de itens antes de renderizar novamente a tela
    lista.innerHTML = '';

    for(tarefa of tarefas){
        // criar o item da lista
        let itemLista = document.createElement('li');

        // adicionar classes no item da lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        // adicionar evento de clique no item da lista
        itemLista.onclick = function(){
            deletarTarefa(this);
        }

        // criar um texto
        let itemTexto = document.createTextNode(tarefa);

        // adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        // adicionar o item da lista na lista
        lista.appendChild(itemLista);
    }
}

// Executando a função para renderizar as tarefas
renderizarTarefas();

// Escutar o evento de clique do botao
btn.onclick = function(){
    // capturando o valor digitado
    let novaTarefa = input.value;

    // validando se existem dados no input
    if(novaTarefa !== ""){
        // adicionar a nova string ao array
        tarefas.push(novaTarefa);

        // executando a função para renderizar as tarefas
        renderizarTarefas();

        // limpar o input
        input.value = '';

        // limpar mensagens de erro (spans)
        removerSpans();

        // salva os dados no storage
        salvaDadosStorage();

    }else{

        // limpar mensagens de erro (spans)
        removerSpans();

        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');
        let msg = document.createTextNode('Voce precisa informar a tarefa!');
        span.appendChild(msg);
        card.appendChild(span);
    }
}

function removerSpans(){
    let spans = document.querySelectorAll('span');
    
    for(let i = 0; i < spans.length; i ++)[
        card.removeChild(spans[i])
    ]
}

function deletarTarefa(tar){
    // remove a tarefa do array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    // executando a função para renderizar as tarefas
    renderizarTarefas();

    // salva os dados no storage
    salvaDadosStorage();
}

function salvaDadosStorage(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) // nomebanco: tarefas
}


