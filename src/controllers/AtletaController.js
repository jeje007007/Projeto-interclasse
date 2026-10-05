const AtletaView = require("../views/AtletaView")

const AtletaController = {
    adicionar(sistema){
        //Listrar Turmas - TurmaView
        const idTurma = AtletaView.perguntarIdTurma();
        try {
            sistema.buscarTurmaOuFalhar();
            const nome = AtletaView.perguntarNome(idturma);
            const { atleta, turma } = sistema.adicionarAtleta(idturma, nome)
            AtletaView.mostrarAtletaVinculado(atleta.nome, turma.nome)
        } catch (erro) {
            AtletaView.mostrarErroCadastro(erro.message)
        }
    },

    listar(sistema) {
    AtletaView.listar(sistema.listarAtletas());
    }
}

module.exports = AtletaController;