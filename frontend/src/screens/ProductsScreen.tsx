import { useEffect, useState } from "react";
import { Alert, FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";
import { AppInput } from "../components/AppInput";
import { productsService } from "../services/products.service";
import { Product } from "../types/api";
import { colors } from "../theme/colors";

export function ProductsScreen() {
  const [items, setItems] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    code: "",
    quantity: "0",
    minStock: "0",
    costPrice: "0",
    salePrice: "0",
    categoryId: "",
    supplierId: "",
    barcode: ""
  });

  async function load() {
    setLoading(true);
    try {
      const data = await productsService.list(1, 30, search);
      setItems(data.items);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createProduct() {
    try {
      await productsService.create({
        name: form.name,
        code: form.code,
        quantity: Number(form.quantity),
        minStock: Number(form.minStock),
        costPrice: Number(form.costPrice),
        salePrice: Number(form.salePrice),
        categoryId: form.categoryId,
        supplierId: form.supplierId,
        barcode: form.barcode || undefined
      });
      setOpen(false);
      await load();
    } catch {
      Alert.alert("Erro", "Falha ao criar produto");
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por nome, codigo ou barcode"
          placeholderTextColor={colors.textMuted}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            color: colors.text,
            paddingHorizontal: 10,
            backgroundColor: colors.surfaceAlt
          }}
        />
        <Pressable onPress={load} style={{ backgroundColor: colors.surface, padding: 10, borderRadius: 10 }}>
          <Text style={{ color: colors.text }}>Buscar</Text>
        </Pressable>
        <Pressable onPress={() => setOpen(true)} style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 10 }}>
          <Text style={{ color: "#062314", fontWeight: "700" }}>Novo</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={load}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: 12,
              padding: 12,
              marginBottom: 8
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "700", fontSize: 16 }}>{item.name}</Text>
            <Text style={{ color: colors.textMuted }}>Codigo: {item.code}</Text>
            <Text style={{ color: colors.textMuted }}>
              Qtd: {item.quantity} | Min: {item.minStock}
            </Text>
          </View>
        )}
      />

      <Modal visible={open} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 20 }}>
          <View style={{ backgroundColor: colors.surface, borderRadius: 14, padding: 16 }}>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: "700", marginBottom: 10 }}>Novo Produto</Text>
            <AppInput label="Nome" value={form.name} onChangeText={(name) => setForm({ ...form, name })} />
            <AppInput label="Codigo" value={form.code} onChangeText={(code) => setForm({ ...form, code })} />
            <AppInput label="Barcode" value={form.barcode} onChangeText={(barcode) => setForm({ ...form, barcode })} />
            <AppInput
              label="Categoria ID"
              value={form.categoryId}
              onChangeText={(categoryId) => setForm({ ...form, categoryId })}
            />
            <AppInput
              label="Fornecedor ID"
              value={form.supplierId}
              onChangeText={(supplierId) => setForm({ ...form, supplierId })}
            />
            <AppInput label="Quantidade" value={form.quantity} onChangeText={(quantity) => setForm({ ...form, quantity })} keyboardType="numeric" />
            <AppInput label="Estoque minimo" value={form.minStock} onChangeText={(minStock) => setForm({ ...form, minStock })} keyboardType="numeric" />
            <AppInput label="Preco custo" value={form.costPrice} onChangeText={(costPrice) => setForm({ ...form, costPrice })} keyboardType="numeric" />
            <AppInput label="Preco venda" value={form.salePrice} onChangeText={(salePrice) => setForm({ ...form, salePrice })} keyboardType="numeric" />

            <View style={{ flexDirection: "row", gap: 8, marginTop: 6 }}>
              <Pressable onPress={() => setOpen(false)} style={{ flex: 1, padding: 12, backgroundColor: colors.surfaceAlt, borderRadius: 10 }}>
                <Text style={{ color: colors.text, textAlign: "center" }}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={createProduct} style={{ flex: 1, padding: 12, backgroundColor: colors.primary, borderRadius: 10 }}>
                <Text style={{ color: "#062314", fontWeight: "700", textAlign: "center" }}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
