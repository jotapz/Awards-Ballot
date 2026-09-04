export const chaveTemporaria = () => `tmp-${Math.random().toString(36).slice(2, 10)}`;

export const categoriaVazia = () => ({
  id: chaveTemporaria(),
  category: "",
  explanation: "",
  lastWinnerDescription: "",
  nominees: [indicadoVazio()],
});

export function indicadoVazio() {
  return { id: chaveTemporaria(), name: "", description: "" };
}

export function mover(lista, de, para) {
  if (para < 0 || para >= lista.length) return lista;

  const copia = [...lista];
  const [item] = copia.splice(de, 1);
  copia.splice(para, 0, item);

  return copia;
}

export const substituirEm = (lista, indice, campos) =>
  lista.map((item, posicao) => (posicao === indice ? { ...item, ...campos } : item));

export const removerDe = (lista, indice) =>
  lista.filter((_, posicao) => posicao !== indice);
