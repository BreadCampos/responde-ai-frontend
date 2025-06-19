"use client";
import { Button } from "@/shared/components/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Dashboard = () => {
  const navigate = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl text-foreground">Meu Dashboard</h1>
      <p className="text-muted-foreground">Bem-vindo de volta!</p>
      <div className="mt-4 flex gap-2">
        <Button
          onClick={() => {
            toast.success("oi");
          }}
          variant="default"
        >
          default
        </Button>
        <Button
          onClick={() => {
            toast.warning("oi");
          }}
          variant="destructive"
        >
          destructive
        </Button>
        <Button
          onClick={() => {
            toast.error("oi");
          }}
          variant="link"
        >
          {" "}
          link
        </Button>
        <Button
          onClick={() => {
            toast.info("oi");
          }}
          variant="outline"
        >
          outline
        </Button>
        <Button
          onClick={() => {
            toast.loading("oi");
          }}
          variant="ghost"
        >
          ghost
        </Button>
        <Button
          onClick={() => {
            toast.error("oi");
          }}
          variant="secondary"
        >
          secondary
        </Button>{" "}
        {/* <-- Ficará ótimo aqui */}
      </div>
      <button
        onClick={() => {
          navigate.push("/");
        }}
      >
        Ir para paragina existente
      </button>
    </div>
  );
};
