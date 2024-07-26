async function buscaEndereco(cep) {
    const mensagemDeErro = document.getElementById('erro');
    mensagemDeErro.innerHTML = "";
    try {
        const consultaDeCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaDeCEPConvertida = await consultaDeCEP.json();
        if (consultaDeCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }
        const cidade = document.getElementById('cidade');
        const logradouro = document.getElementById('endereco');
        const bairro = document.getElementById('bairro');
        const estado = document.getElementById('estado');

        cidade.value = consultaDeCEPConvertida.localidade;
        logradouro.value = consultaDeCEPConvertida.logradouro;
        bairro.value = consultaDeCEPConvertida.bairro;
        estado.value = consultaDeCEPConvertida.uf;

        console.log(consultaDeCEPConvertida);
        return consultaDeCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

const cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));