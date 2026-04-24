import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { AppInput } from "../components/AppInput";
import { genericCrudService } from "../services/generic-crud.service";
import { Supplier } from "../types/api";
import { colors } from "../theme/colors";

export function SuppliersScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState<Supplier[]>([]);

  async function load() {
    const { data } = await genericCrudService.listSuppliers();
    setItems(data.items);
  }

  useEffect(() => {
    load();
  }, []);

  async function create() {
    if (!name) return;
    await genericCrudService.createSupplier({ name, email: email || undefined, phone: phone || undefined });
    setName("");
    setEmail("");
    setPhone("");
    load();
  }

  async function remove(id: string) {
    try {
      await genericCrudService.deleteSupplier(id);
      load();
    } catch {
      Alert.alert("Erro", "Fornecedor vinculado a produtos");
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <AppInput label="Nome" value={name} onChangeText={setName} />
      <AppInput label="Email" value={email} onChangeText={setEmail} />
      <AppInput label="Telefone" value={phone} onChangeText={setPhone} />
      <Pressable onPress={create} style={{ backgroundColor: colors.primary, borderRadius: 10, padding: 10, marginBottom: 12 }}>
        <Text style={{ color: "#062314", textAlign: "center", fontWeight: "700" }}>Adicionar fornecedor</Text>
      </Pressable>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: colors.surface, padding: 12, borderRadius: 10, marginBottom: 8, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text }}>{item.name}</Text>
              <Text style={{ color: colors.textMuted }}>{item.email || "-"}</Text>
            </View>
            <Pressable onPress={() => remove(item.id)}>
              <Text style={{ color: colors.danger }}>Excluir</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
