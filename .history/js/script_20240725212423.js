
const elementos = {
    formulario: '[data-js="formulario"]',
    mensagemDeErro: '[data-js="mensagem-de-erro"]',
}


const formulario = document.querySelector(`${elementos.formulario}`);
const mensagemDeErro = document.querySelector(`${elementos.mensagemDeErro}`);
const cep = formulario.cep;

async function buscaEndereco(cep) {
    mensagemDeErro.innerHTML = "";

    try {
        const consultaDeCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaDeCEPConvertida = await consultaDeCEP.json();

        if (consultaDeCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }

        formulario.cidade.value = consultaDeCEPConvertida.localidade;
        formulario.endereco.value = consultaDeCEPConvertida.logradouro;
        formulario.bairro.value = consultaDeCEPConvertida.bairro;
        formulario.estado.value = consultaDeCEPConvertida.uf;

        console.log(consultaDeCEPConvertida);

        return consultaDeCEPConvertida;

    } catch (erro) {
        mensagemDeErro.innerHTML = `<p class="erro__imagem"></p><p class="erro__texto">CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

cep.addEventListener("focusout", () => buscaEndereco(cep.value));