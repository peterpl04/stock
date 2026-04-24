import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "../hooks/redux";
import { CategoriesScreen } from "../screens/CategoriesScreen";
import { DashboardScreen } from "../screens/DashboardScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { ProductsScreen } from "../screens/ProductsScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ReportsScreen } from "../screens/ReportsScreen";
import { StockMovementsScreen } from "../screens/StockMovementsScreen";
import { SuppliersScreen } from "../screens/SuppliersScreen";
import { colors } from "../theme/colors";

const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Cadastro" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        drawerStyle: { backgroundColor: colors.surface, width: 320 },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textMuted,
        sceneContainerStyle: { backgroundColor: colors.background }
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Produtos" component={ProductsScreen} />
      <Drawer.Screen name="Categorias" component={CategoriesScreen} />
      <Drawer.Screen name="Fornecedores" component={SuppliersScreen} />
      <Drawer.Screen name="Movimentacoes" component={StockMovementsScreen} />
      <Drawer.Screen name="Relatorios" component={ReportsScreen} />
    </Drawer.Navigator>
  );
}

export function RootNavigator() {
  const token = useAppSelector((state) => state.auth.token);
  return token ? <AppDrawer /> : <AuthNavigator />;
}
