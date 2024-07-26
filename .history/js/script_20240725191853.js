
const elementos = {
    forumario: '[data-js="formulario"]',
    mensagemDeErro: '[data-js="mensagem-de-erro"]',
}

const formulario = document.querySelector(`${elementos.forumario}`);
const mensagemDeErro = document.querySelector(`${elementos.mensagemDeErro}`);

console.log(formulario.cep.value = '08121340');

async function buscaEndereco(cep) {
    mensagemDeErro.innerHTML = "";
    try {
        const consultaDeCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaDeCEPConvertida = await consultaDeCEP.json();
        if (consultaDeCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }

        formulario.cidade.value = consultaDeCEPConvertida.localidade;
        formulario.logradouro.value = consultaDeCEPConvertida.logradouro;
        formulario.bairro.value = consultaDeCEPConvertida.bairro;
        formulario.estado.value = consultaDeCEPConvertida.uf;

        console.log(consultaDeCEPConvertida);
        return consultaDeCEPConvertida;
    } catch (erro) {
        mensagemDeErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

formulario.cep.addEventListener("focusout", () => buscaEndereco(formulario.cep.value));