import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { StatCard } from "../components/StatCard";
import { productsService } from "../services/products.service";
import { colors } from "../theme/colors";

type Summary = {
  totalProducts: number;
  lowStockCount: number;
  totalStockValue: number;
};

export function DashboardScreen() {
  const [summary, setSummary] = useState<Summary>({ totalProducts: 0, lowStockCount: 0, totalStockValue: 0 });
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    setRefreshing(true);
    try {
      const data = await productsService.dashboard();
      setSummary(data);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} tintColor={colors.primary} />}
    >
      <Text style={{ color: colors.text, fontSize: 26, fontWeight: "700", marginBottom: 8 }}>Visao geral</Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <StatCard title="Total de produtos" value={String(summary.totalProducts)} />
        <StatCard title="Estoque baixo" value={String(summary.lowStockCount)} accent={colors.warning} />
      </View>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <StatCard title="Valor total em estoque" value={`R$ ${summary.totalStockValue.toFixed(2)}`} accent={colors.info} />
      </View>
    </ScrollView>
  );
}
