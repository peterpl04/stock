import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { AppInput } from "../components/AppInput";
import { genericCrudService } from "../services/generic-crud.service";
import { Category } from "../types/api";
import { colors } from "../theme/colors";

export function CategoriesScreen() {
  const [name, setName] = useState("");
  const [items, setItems] = useState<Category[]>([]);

  async function load() {
    const { data } = await genericCrudService.listCategories();
    setItems(data.items);
  }

  useEffect(() => {
    load();
  }, []);

  async function create() {
    if (!name) return;
    await genericCrudService.createCategory(name);
    setName("");
    load();
  }

  async function remove(id: string) {
    try {
      await genericCrudService.deleteCategory(id);
      load();
    } catch {
      Alert.alert("Erro", "Categoria vinculada a produtos");
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <AppInput label="Nova categoria" value={name} onChangeText={setName} />
      <Pressable onPress={create} style={{ backgroundColor: colors.primary, borderRadius: 10, padding: 10, marginBottom: 12 }}>
        <Text style={{ color: "#062314", textAlign: "center", fontWeight: "700" }}>Adicionar</Text>
      </Pressable>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: colors.surface, padding: 12, borderRadius: 10, marginBottom: 8, flexDirection: "row" }}>
            <Text style={{ color: colors.text, flex: 1 }}>{item.name}</Text>
            <Pressable onPress={() => remove(item.id)}>
              <Text style={{ color: colors.danger }}>Excluir</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
