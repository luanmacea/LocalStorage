import { db } from "./SQLite";

export function criatabela() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Notas " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT,  texto TEXT);"
    );
  });
}

export function adicionaNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO Notas (titulo, categoria, texto) VALUES (?, ?, ?)",
        [nota.titulo, nota.categoria, nota.texto],
        () => {
          resolve("Nota adicionada com sucesso");
        }
      );
    });
  });
}

export function atualizaNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE Notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?",
        [nota.titulo, nota.categoria, nota.texto, nota.id],
        () => {
          resolve("Nota atualizada com sucesso");
        }
      );
    });
  });
}

export function removeNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "DELETE FROM Notas WHERE id = ?",
        [nota.id],
        () => {
          resolve("Nota removida com sucesso");
        }
      );
    });
  });
}

export function buscaNotas() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM Notas;",
        [],
        (transaction, resultado) => {
          resolve(resultado.rows._array);
        }
      );
    });
  });
}

export function filtrarNotas({pesquisa}) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      if (pesquisa === "Todos") {
        transaction.executeSql(
          "SELECT * FROM Notas;",
          [],
          (transaction, resultado) => {
            resolve(resultado.rows._array);
            console.log("todos -_-");
          }
        );
      } else {
        transaction.executeSql(
          "SELECT * FROM Notas WHERE categoria = ?",
          [pesquisa],
          (transaction, resultado) => {
            resolve(resultado.rows._array);
            console.log("categoria");
          }
        );
      }
    });
  });
}
