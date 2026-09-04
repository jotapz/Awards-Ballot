const ESTILOS_DO_CLONE =
  "*{border-color:#D9A566;outline-color:#00000000;}" +
  "html,body{background:#FFFFFF;color:#3A3535;}";

const semAcento = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const nomeDoArquivo = (award, nome) =>
  `bolao-${award}${nome.trim() ? `-${semAcento(nome)}` : ""}.png`;

/**
 * Renderiza o elemento em PNG e dispara o download.
 * As regras injetadas no clone trocam as cores oklch do Tailwind v4, que o
 * html2canvas não sabe interpretar, por hex equivalentes.
 */
export async function baixarComoPng(elemento, nomeArquivo) {
  const { default: html2canvas } = await import("html2canvas");

  const canvas = await html2canvas(elemento, {
    scale: 2,
    backgroundColor: "#FFFFFF",
    useCORS: true,
    onclone: (documento) => {
      const estilo = documento.createElement("style");
      estilo.textContent = ESTILOS_DO_CLONE;
      documento.head.appendChild(estilo);
    },
  });

  const link = document.createElement("a");
  link.download = nomeArquivo;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
