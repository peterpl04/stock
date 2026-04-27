import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { AppInput } from "../components/AppInput";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { login } from "../store/auth.slice";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<any, "Login">;

export function LoginScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const [email, setEmail] = useState("admin@lato.com");
  const [password, setPassword] = useState("123456");

  async function onSubmit() {
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as { message?: string } | undefined)?.message;
        Alert.alert("Erro", message || "Falha ao autenticar");
        return;
      }
      Alert.alert("Erro", "Falha ao autenticar");
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", padding: 24 }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: "700", marginBottom: 18 }}>Lato Estoque</Text>
      <AppInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <AppInput label="Senha" value={password} onChangeText={setPassword} secureTextEntry />

      <Pressable
        onPress={onSubmit}
        style={{
          backgroundColor: colors.primary,
          borderRadius: 10,
          padding: 12,
          marginTop: 8,
          alignItems: "center"
        }}
      >
        <Text style={{ color: "#062314", fontWeight: "700" }}>{loading ? "Entrando..." : "Entrar"}</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Cadastro")} style={{ marginTop: 12, alignItems: "center" }}>
        <Text style={{ color: colors.textMuted }}>Criar conta</Text>
      </Pressable>
    </View>
  );
}
