const prompt = require("prompt-sync")();

const AtletaView = {
    perguntarIdTurma(){
        return parseInt(prompt("ID da Turma do Atleta"));
    },
    perguntarNome(){
        return prompt("Nome do Atleta: ");
    },
    perguntaId(){
        return parse(prompt(rotulo));
    },
    mostrarAtletaVinculado(nomeAtleta, nomeTurma){
        console.log(`✔ Atleta "${nomeAtleta}" vinculado ao ${turma.nome}!`);
    },
    mostrarErroCadastro(mensagem){
        console.log(`✖ Não foi possível cadastrar o atleta: ${mensagem}`);
    },
    listarAtletas(lista){
        console.log("\n=== LISTA DE ATLETAS ===");
        if (this.atletas.length === 0) return console.log("Nenhum árbitro no sistema.");
        lista.forEach(({ atleta, nomeTurma }) => atleta.exibir(nomeTurma));
    }
}

module.exports = AtletaView;