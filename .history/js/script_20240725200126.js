
const elementos = {
    formulario: '[data-js="formulario"]',
    mensagemDeErro: '[data-js="mensagem-de-erro"]',
}


// const cidade = document.getElementById('cidade');
// const logradouro = document.getElementById('endereco');
// const bairro = document.getElementById('bairro');
// const estado = document.getElementById('estado');
// const cep = document.getElementById('cep');
// const mensagemDeErro = document.getElementById('erro');

const formulario = document.querySelector(`${elementos.formulario}`);

console.log(formulario);

async function buscaEndereco(cep) {
    mensagemDeErro.innerHTML = "";
    try {
        const consultaDeCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaDeCEPConvertida = await consultaDeCEP.json();

        if (consultaDeCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }

        cidade.value = consultaDeCEPConvertida.localidade;
        logradouro.value = consultaDeCEPConvertida.logradouro;
        bairro.value = consultaDeCEPConvertida.bairro;
        estado.value = consultaDeCEPConvertida.uf;

        console.log(consultaDeCEPConvertida);

        return consultaDeCEPConvertida;

    } catch (erro) {
        mensagemDeErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

cep.addEventListener("focusout", () => buscaEndereco(cep.value));