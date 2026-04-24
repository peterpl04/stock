import { app } from "./app";
import { env } from "./utils/env";

app.listen(env.PORT, () => {
  // Log simples para confirmar inicializacao do backend em desenvolvimento.
  console.log(`Lato Estoque API rodando na porta ${env.PORT}`);
});
