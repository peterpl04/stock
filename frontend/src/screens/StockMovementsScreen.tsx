import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { AppInput } from "../components/AppInput";
import { genericCrudService } from "../services/generic-crud.service";
import { StockMovement } from "../types/api";
import { colors } from "../theme/colors";

export function StockMovementsScreen() {
  const [items, setItems] = useState<StockMovement[]>([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1");

  async function load() {
    const { data } = await genericCrudService.listMovements();
    setItems(data.items);
  }

  useEffect(() => {
    load();
  }, []);

  async function create(type: "ENTRY" | "EXIT") {
    await genericCrudService.createMovement({
      type,
      quantity: Number(quantity),
      productId
    });
    await load();
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <AppInput label="Produto ID" value={productId} onChangeText={setProductId} />
      <AppInput label="Quantidade" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />

      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        <Pressable onPress={() => create("ENTRY")} style={{ flex: 1, backgroundColor: colors.primary, borderRadius: 10, padding: 10 }}>
          <Text style={{ color: "#062314", textAlign: "center", fontWeight: "700" }}>Entrada</Text>
        </Pressable>
        <Pressable onPress={() => create("EXIT")} style={{ flex: 1, backgroundColor: colors.warning, borderRadius: 10, padding: 10 }}>
          <Text style={{ color: "#1A1304", textAlign: "center", fontWeight: "700" }}>Saida</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: colors.surface, borderRadius: 10, padding: 12, marginBottom: 8 }}>
            <Text style={{ color: colors.text }}>{item.product.name}</Text>
            <Text style={{ color: colors.textMuted }}>
              {item.type} - Qtd: {item.quantity}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
