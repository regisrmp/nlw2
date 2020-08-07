// procurar o botao
document.querySelector("#add-time")
// quando clicar no botao
.addEventListener('click', cloneField);

// executar uma ação
function cloneField () {
    // duplicar os campos: quem?
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true); // clona o no nó caso o div

    // limpar os campos
    const fields = newFieldContainer.querySelectorAll('input');

    fields.forEach((field) => {
        field.value = "";
    });

    // colocar na pagina: onde?
    document.querySelector("#schedule-items").appendChild(newFieldContainer); // insere os fields no nó selecionado
}