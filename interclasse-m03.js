const prompt = require("prompt-sync")();

// 1. Superclasse Pessoa
class Pessoa {
  #id;
  #nome;

  constructor(id, nome) {
    this.#id = id;
    this.nome = nome;
  }

  get id() {
    return this.#id;
  }

  set nome(novoNome) {
    if (!novoNome || novoNome.trim().length < 3) {
      console.log("[ERRO] - Nome inválido");
      return;
    }

    this.#nome = novoNome.trim();
  }

  get nome() {
    return this.#nome;
  }

  exibir() {
    console.log(`[Pessoa] ID: ${this.#id}, Nome: ${this.#nome}`);
  }
}

// 2. Modelo Turma
class Turma {
  #nome;
  #id;

  constructor(id, nome) {
    this.#id = id;
    this.nome = nome;
  }

  set nome(novoNome) {
    if (!novoNome || novoNome.trim().length < 3) {
      console.log("[ERRO] - Nome inválido");
      return;
    }

    this.#nome = novoNome.trim().toUpperCase();
  }

  get nome() {
    return this.#nome;
  }

  get id() {
    return this.#id;
  }

  exibir() {
    console.log(`ID: ${this.#id} | Sala: ${this.#nome}`);
  }
}

// 3. Atleta herdando de Pessoa
class Atleta extends Pessoa {
  #idTurma;

  constructor(id, nome, idTurma) {
    super(id, nome);
    this.idTurma = idTurma;
  }

  set idTurma(novoIdTurma) {
    if (
      novoIdTurma === null ||
      novoIdTurma === undefined ||
      novoIdTurma === "" ||
      !Number.isInteger(novoIdTurma) ||
      novoIdTurma <= 0
    ) {
      console.log("[ERRO] - ID de Turma inválido");
      return;
    }

    this.#idTurma = novoIdTurma;
  }

  get idTurma() {
    return this.#idTurma;
  }

  // Override
  exibir(nomeTurma) {
    super.exibir();
    console.log(`Atleta: ${this.nome} | Turma: ${nomeTurma}`);
  }
}

// 4. Arbitro herdando de Pessoa
class Arbitro extends Pessoa {
  #especialidade;

  constructor(id, nome, especialidade) {
    super(id, nome);
    this.#especialidade = especialidade;
  }

  get especialidade() {
    return this.#especialidade;
  }

  // Override
  exibir() {
    super.exibir();
    console.log(
      `Árbitro: ${this.nome} | Especialidade: ${this.especialidade}`
    );
  }
}

// 5. Classe Gerenciadora
class ArenaConnect {
  constructor() {
    this.turmas = [];
    this.atletas = [];
    this.arbitros = [];

    this.idTurmaContador = 1;
    this.idAtletaContador = 1;
    this.idArbitroContador = 1;
  }

  adicionarTurma() {
    const nome = prompt("Nome da nova turma: ");

    const novaTurma = new Turma(
      this.idTurmaContador++,
      nome
    );

    this.turmas.push(novaTurma);

    console.log("✔ Turma registrada com sucesso!");
  }

  listarTurmas() {
    console.log("\n=== LISTA DE TURMAS ===");

    if (this.turmas.length === 0) {
      return console.log("Nenhuma turma no sistema.");
    }

    this.turmas.forEach((t) => t.exibir());
  }

  editarTurma() {
    this.listarTurmas();

    const id = parseInt(prompt("ID da turma para editar: "));

    const turma = this.turmas.find((t) => t.id === id);

    if (turma) {
      const novoNome = prompt(`Novo nome para ${turma.nome}: `);
      turma.nome = novoNome;

      console.log("✔ Dados atualizados!");
    } else {
      console.log("✖ Erro: ID não encontrado.");
    }
  }

  removerTurma() {
    this.listarTurmas();

    const id = parseInt(prompt("ID da turma para remover: "));

    const totalAntes = this.turmas.length;

    this.turmas = this.turmas.filter((t) => t.id !== id);

    if (this.turmas.length < totalAntes) {
      console.log("✔ Turma removida.");
    } else {
      console.log("✖ Erro: ID não encontrado.");
    }
  }

  adicionarAtleta() {
    this.listarTurmas();

    const idT = parseInt(prompt("ID da Turma do atleta: "));

    const turmaExiste = this.turmas.find((t) => t.id === idT);

    if (!turmaExiste) {
      return console.log("✖ Erro: Turma inválida!");
    }

    const nome = prompt("Nome do Atleta: ");

    const novoAtleta = new Atleta(
      this.idAtletaContador++,
      nome,
      idT
    );

    this.atletas.push(novoAtleta);

    console.log(
      `✔ Atleta "${novoAtleta.nome}" vinculado ao ${turmaExiste.nome}!`
    );
  }

  listaAtleta() {
    console.log("\n=== LISTA DE ATLETAS ===");

    if (this.atletas.length === 0) {
      return console.log("Nenhum atleta cadastrado.");
    }

    this.atletas.forEach((atleta) => {
      const turma = this.turmas.find(
        (t) => t.id === atleta.idTurma
      );

      const nomeTurma = turma
        ? turma.nome
        : "Turma não encontrada";

      atleta.exibir(nomeTurma);
    });
  }

  adicionarArbitro() {
    const nome = prompt("Nome do Árbitro: ");
    const especialidade = prompt("Especialidade: ");

    const novoArbitro = new Arbitro(
      this.idArbitroContador++,
      nome,
      especialidade
    );

    this.arbitros.push(novoArbitro);

    console.log(
      `✔ Árbitro "${novoArbitro.nome}" registrado com sucesso!`
    );
  }

  listarArbitros() {
    console.log("\n=== LISTA DE ÁRBITROS ===");

    if (this.arbitros.length === 0) {
      return console.log("Nenhum árbitro cadastrado.");
    }

    this.arbitros.forEach((arbitro) => {
      arbitro.exibir();
    });
  }

  // 6. Teste de Polimorfismo
  testarPolimorfismo() {
    console.log("\n=== TESTE DE POLIMORFISMO ===");

    const pessoas = [
      ...this.atletas,
      ...this.arbitros
    ];

    if (pessoas.length === 0) {
      return console.log("Nenhuma pessoa cadastrada.");
    }

    pessoas.forEach((pessoa) => {
      if (pessoa instanceof Atleta) {
        const turma = this.turmas.find(
          (t) => t.id === pessoa.idTurma
        );

        const nomeTurma = turma
          ? turma.nome
          : "Turma não encontrada";

        pessoa.exibir(nomeTurma);
      } else {
        pessoa.exibir();
      }
    });
  }
}

// 7. Menu Principal
function main() {
  const sistema = new ArenaConnect();

  while (true) {
    console.log(`
==============================
ARENA-CONNECT v2.0 - PBE1
==============================
1. Registrar Turma
2. Listar Turmas
3. Editar Turma
4. Remover Turma
5. Registrar Atleta
6. Listar Atletas
7. Registrar Árbitro
8. Listar Árbitros
9. Testar Polimorfismo
0. Sair
==============================`);

    let op = prompt("Escolha: ");

    if (op === "1") sistema.adicionarTurma();
    else if (op === "2") sistema.listarTurmas();
    else if (op === "3") sistema.editarTurma();
    else if (op === "4") sistema.removerTurma();
    else if (op === "5") sistema.adicionarAtleta();
    else if (op === "6") sistema.listaAtleta();
    else if (op === "7") sistema.adicionarArbitro();
    else if (op === "8") sistema.listarArbitros();
    else if (op === "9") sistema.testarPolimorfismo();
    else if (op === "0") break;
    else console.log("Opção inválida!");
  }
}

main();