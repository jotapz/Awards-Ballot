"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginAdmin = ({ onEntrar }) => {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const enviar = async (evento) => {
    evento.preventDefault();
    setErro("");

    try {
      await onEntrar(senha);
      setSenha("");
    } catch (falha) {
      setErro(falha.message);
    }
  };

  return (
    <motion.form
      onSubmit={enviar}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mt-24 w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8"
    >
      <Lock className="mb-4 size-6 text-[#C9A227]" />
      <h1 className="font-display text-2xl text-white">Painel de indicados</h1>
      <p className="mt-1 mb-6 text-xs text-white/50">
        Área restrita para cadastrar as categorias do ano.
      </p>

      <Input
        type="password"
        value={senha}
        onChange={(evento) => setSenha(evento.target.value)}
        placeholder="Senha do admin"
        autoFocus
      />
      {erro && <p className="mt-2 text-xs text-red-400">{erro}</p>}

      <Button type="submit" className="mt-4 w-full">
        Entrar
      </Button>
    </motion.form>
  );
};

export default LoginAdmin;
