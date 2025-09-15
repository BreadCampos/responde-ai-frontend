"use client";

import { APP_ENV } from "@/env";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Check, Clipboard } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function EmbedCode() {
  const { surveyId } = useParams<{ surveyId: string }>();

  const { t } = useTranslation("surveys");
  const [copied, setCopied] = useState("");

  const baseUrl = APP_ENV.APP_URL;
  const iframeCode = `<iframe
  src="${baseUrl}/s/${surveyId}"
  style="width: 100%; height: 200px; border: none;"
  title="Formulário de Pesquisa NPS">
</iframe>`;

  const handleCopy = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopied(type);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="flex flex-col gap-2 items-center justify-between md:flex-row">
          {t("surveyDetails.embedCode.title")}
        </CardTitle>
        <CardDescription>
          <p className="mt-2 text-sm ">
            {t("surveyDetails.embedCode.description")}
          </p>{" "}
          <p className="text-sm ">{t("surveyDetails.embedCode.paragraph")}</p>
        </CardDescription>
      </CardHeader>

      <div className="relative mt-2">
        <pre className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto text-sm">
          <code>{iframeCode}</code>
        </pre>
        <button
          onClick={() => handleCopy(iframeCode, "iframe")}
          className="absolute top-2 right-2 flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-md transition-all duration-200"
        >
          {copied === "iframe" ? <Check size={16} /> : <Clipboard size={16} />}
        </button>
      </div>
    </Card>
  );
}
