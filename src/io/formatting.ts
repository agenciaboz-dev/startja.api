const normalize = (string: string) =>
  string
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "");

export default normalize;

const cfopDocType = (data: string) => {
  const cfopNumber = Number(data);
  if (cfopNumber >= 1000 && cfopNumber <= 3999) return 0;
  if (cfopNumber >= 5000 && cfopNumber <= 7999) return 1;
  return "invalido";
};

export { cfopDocType };
