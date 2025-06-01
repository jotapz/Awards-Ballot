"use client";
import { createContext, useContext, useState } from "react";

const VotacaoContext = createContext();

export const VotacaoProvider = ({ children }) => {
  const [respostas, setRespostas] = useState({});

  const salvarResposta = (categoria, resposta) => {
    setRespostas(prev => ({ ...prev, [categoria]: resposta }));
  };

  return (
    <VotacaoContext.Provider value={{ respostas, salvarResposta }}>
      {children}
    </VotacaoContext.Provider>
  );
};

export const useVotacao = () => useContext(VotacaoContext);