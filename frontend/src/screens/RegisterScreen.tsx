import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { AppInput } from "../components/AppInput";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { register } from "../store/auth.slice";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<any, "Cadastro">;

export function RegisterScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit() {
    try {
      await dispatch(register({ name, email, password })).unwrap();
      navigation.goBack();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as { message?: string } | undefined)?.message;
        Alert.alert("Erro", message || "Falha ao cadastrar");
        return;
      }
      Alert.alert("Erro", "Falha ao cadastrar");
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", padding: 24 }}>
      <Text style={{ color: colors.text, fontSize: 26, fontWeight: "700", marginBottom: 16 }}>Novo usuario</Text>
      <AppInput label="Nome" value={name} onChangeText={setName} />
      <AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <AppInput label="Senha" value={password} onChangeText={setPassword} secureTextEntry />

      <Pressable
        onPress={onSubmit}
        style={{
          marginTop: 8,
          backgroundColor: colors.primary,
          borderRadius: 10,
          alignItems: "center",
          padding: 12
        }}
      >
        <Text style={{ color: "#062314", fontWeight: "700" }}>{loading ? "Salvando..." : "Cadastrar"}</Text>
      </Pressable>
    </View>
  );
}
