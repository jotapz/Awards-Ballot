"use client";

import { forwardRef } from "react";

const PALETA = {
  papel: "#FFFFFF",
  tinta: "#3A3535",
  suave: "#6E6660",
  moldura: "#D9A566",
  faixaEsquerda: "#C8B98A",
  faixaDireita: "#C79A63",
  barraTopo: "#E0A96D",
  barraBase: "#F6D9BE",
  destaque: "#D98C3F",
  ouro: "#D9B441",
};

const COLUNAS = 3;

/** Reparte as categorias em colunas equilibradas: html2canvas não lê CSS multi-column. */
function distribuirEmColunas(categorias) {
  const peso = (categoria) => 2 + (categoria.nominees?.length ?? 0);
  const alvo = categorias.reduce((soma, categoria) => soma + peso(categoria), 0) / COLUNAS;

  const colunas = Array.from({ length: COLUNAS }, () => []);
  let atual = 0;
  let acumulado = 0;

  categorias.forEach((categoria, indice) => {
    const restantes = categorias.length - indice;
    const vagas = COLUNAS - atual;

    if (atual < COLUNAS - 1 && acumulado >= alvo && restantes > vagas - 1) {
      atual += 1;
      acumulado = 0;
    }

    colunas[atual].push(categoria);
    acumulado += peso(categoria);
  });

  return colunas;
}

const Caixa = ({ marcada }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 11,
      height: 11,
      marginTop: 3,
      flex: "0 0 auto",
      border: `1px solid ${PALETA.tinta}`,
      background: marcada ? PALETA.ouro : "transparent",
      color: PALETA.tinta,
      fontSize: 9,
      lineHeight: 1,
      fontWeight: 700,
    }}
  >
    {marcada ? "✕" : ""}
  </span>
);

const Categoria = ({ categoria, escolhidoId }) => (
  <div style={{ marginBottom: 22 }}>
    <p
      style={{
        margin: "0 0 8px",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: PALETA.tinta,
      }}
    >
      {categoria.category}
    </p>

    {categoria.nominees.map((indicado) => {
      const marcado = escolhidoId === indicado.id;

      return (
        <div
          key={indicado.id}
          style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 4 }}
        >
          <Caixa marcada={marcado} />
          <span style={{ fontSize: 10.5, lineHeight: 1.35 }}>
            <span
              style={{
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: marcado ? 700 : 400,
                color: PALETA.tinta,
              }}
            >
              {indicado.name}
            </span>
            {indicado.description && (
              <span style={{ marginLeft: 6, color: PALETA.suave, fontStyle: "italic" }}>
                {indicado.description}
              </span>
            )}
          </span>
        </div>
      );
    })}
  </div>
);

const Moldura = ({ children, style }) => (
  <div
    style={{
      border: `2px solid ${PALETA.moldura}`,
      padding: "12px 16px",
      fontSize: 13,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      ...style,
    }}
  >
    {children}
  </div>
);

/** Folha impressa do bolão: só cores em hex, porque html2canvas não entende oklch. */
const BallotSheet = forwardRef(function BallotSheet({ edicao, votos, nome, largura }, ref) {
  const categorias = edicao?.categories ?? [];
  const marcadas = categorias.filter((categoria) => votos[categoria.id]).length;
  const ano = String(edicao?.year ?? "");
  const titulo = (edicao?.awardsName ?? "").replace(/\s*\d{4}\s*/, " ").trim();

  return (
    <div
      ref={ref}
      style={{
        width: largura,
        background: PALETA.papel,
        color: PALETA.tinta,
        fontFamily: "var(--font-ui), 'Josefin Sans', sans-serif",
        position: "relative",
        paddingBottom: 28,
        boxSizing: "border-box",
      }}
    >
      <div style={{ height: 18, background: PALETA.barraTopo }} />

      <div style={{ display: "flex" }}>
        <div style={{ width: 16, background: PALETA.faixaEsquerda }} />

        <div style={{ flex: 1, padding: "26px 34px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              marginBottom: 26,
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 700, color: PALETA.destaque }}>
              {ano.slice(0, 2)}
            </span>
            <span
              style={{
                fontFamily: "var(--font-display), 'Poiret One', serif",
                fontSize: 62,
                lineHeight: 1,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: PALETA.ouro,
              }}
            >
              {titulo} Ballot
            </span>
            <span style={{ fontSize: 22, fontWeight: 700, color: PALETA.destaque }}>
              {ano.slice(2)}
            </span>
          </div>

          <div style={{ display: "flex", gap: 26, alignItems: "flex-start" }}>
            {distribuirEmColunas(categorias).map((coluna, indice) => (
              <div key={indice} style={{ flex: 1, minWidth: 0 }}>
                {coluna.map((categoria) => (
                  <Categoria
                    key={categoria.id}
                    categoria={categoria}
                    escolhidoId={votos[categoria.id]}
                  />
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
            <Moldura style={{ flex: 2 }}>
              Nome: <span style={{ letterSpacing: "0.05em" }}>{nome}</span>
            </Moldura>
            <Moldura style={{ flex: 1 }}>
              Placar: {marcadas} / {categorias.length}
            </Moldura>
          </div>

          <Moldura
            style={{
              marginTop: 12,
              textAlign: "center",
              fontSize: 12,
              letterSpacing: "0.32em",
              padding: "10px 16px",
            }}
          >
            Awards Ballot
          </Moldura>
        </div>

        <div style={{ width: 16, background: PALETA.faixaDireita }} />
      </div>

      <div
        style={{
          height: 16,
          background: PALETA.barraBase,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </div>
  );
});

export default BallotSheet;
