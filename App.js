import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import NotaEditor from "./src/componentes/NotaEditor";

import { Nota } from "./src/componentes/Nota";
import { criatabela, buscaNotas, filtrarNotas } from "./src/servicos/Notas";

export default function App() {
  const [pesquisa, setPesquisa] = useState("Todos");
  if (pesquisa) {
    useEffect(() => {
      criatabela();
      mostraNotas();
    }, [ pesquisa ]);
  }

  const [notaSelecionada, setNotaSelecionada] = useState({});
  const [notas, setNotas] = useState([]);

  async function mostraNotas() {
    const todasNotas = await filtrarNotas({ pesquisa });
    setNotas(todasNotas);
  }

  return (
    <SafeAreaView style={estilos.container}>
      <Picker
        selectedValue={pesquisa}
        onValueChange={setPesquisa}
      >
        <Picker.Item label="Todos" value="Todos" />
        <Picker.Item label="Pessoal" value="Pessoal" />
        <Picker.Item label="Trabalho" value="Trabalho" />
        <Picker.Item label="Outros" value="Outros" />
      </Picker>
      <FlatList
        data={notas}
        renderItem={(nota) => (
          <Nota {...nota} setNotaSelecionada={setNotaSelecionada} />
        )}
        keyExtractor={(nota) => nota.id}
      />
      <NotaEditor
        mostraNotas={mostraNotas}
        notaSelecionada={notaSelecionada}
        setNotaSelecionada={setNotaSelecionada}
      />
      <StatusBar />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
