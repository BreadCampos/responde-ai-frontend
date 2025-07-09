// A diretiva 'use client' é obrigatória.
// Ela informa ao Next.js que este é um Componente Cliente,
// o que nos permite usar hooks como o `useTranslation`.
"use client";

// Importamos o hook diretamente da biblioteca 'react-i18next'.
import { useTranslation } from "react-i18next";

export default function MyClientComponent() {
  // Chamamos o hook `useTranslation`, passando o nome do "namespace"
  // que queremos usar. No nosso caso, é o arquivo 'common.json'.
  // O hook retorna, entre outras coisas, a função 't' (de "translation").
  const { t } = useTranslation("common");

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}
    >
      <h2>Este é um Componente Cliente</h2>

      {/* Usamos a função 't' para obter as traduções. */}
      {/* Basta passar a chave (key) do JSON como argumento. */}
      <p>
        Tradução do cliente: <strong>{t("description")}</strong>
      </p>
    </div>
  );
}
