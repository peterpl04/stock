import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { AppInput } from "../components/AppInput";
import { genericCrudService } from "../services/generic-crud.service";
import { StockMovement } from "../types/api";
import { colors } from "../theme/colors";

export function ReportsScreen() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [items, setItems] = useState<StockMovement[]>([]);

  async function runReport() {
    const { data } = await genericCrudService.listMovements(from || undefined, to || undefined);
    setItems(data.items);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: "700", marginBottom: 8 }}>Relatorio de movimentacoes</Text>
      <AppInput label="Data inicial (YYYY-MM-DD)" value={from} onChangeText={setFrom} />
      <AppInput label="Data final (YYYY-MM-DD)" value={to} onChangeText={setTo} />
      <Pressable onPress={runReport} style={{ backgroundColor: colors.info, borderRadius: 10, padding: 10, marginBottom: 12 }}>
        <Text style={{ color: "#08121F", textAlign: "center", fontWeight: "700" }}>Gerar relatorio</Text>
      </Pressable>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: colors.surface, borderRadius: 10, padding: 12, marginBottom: 8 }}>
            <Text style={{ color: colors.text }}>{item.product.name}</Text>
            <Text style={{ color: colors.textMuted }}>
              {item.type} | {item.quantity} | {new Date(item.createdAt).toLocaleString("pt-BR")}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
