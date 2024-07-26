
const elementos = {
    formulario: '[data-js="formulario"]',
    mensagemDeErro: '[data-js="mensagem-de-erro"]',
}

const formulario = document.querySelector(`${elementos.formulario}`);
const mensagemDeErro = document.querySelector(`${elementos.mensagemDeErro}`);
const cep = document.getElementById('cep');


async function buscaEndereco(cep) {
    mensagemDeErro.innerHTML = "";
    try {
        const consultaDeCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaDeCEPConvertida = await consultaDeCEP.json();

        console.log(consultaDeCEPConvertida);

    

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

cep.addEventListener("focusout", () => buscaEndereco(cep.value));