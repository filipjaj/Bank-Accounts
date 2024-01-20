const formatMoney = (amount: number | string) => {
  if (typeof amount !== "number") return "";
  const options1 = { style: "currency", currency: "NOK" };
  const numberFormat1 = new Intl.NumberFormat("nb-No", options1);
  return numberFormat1.format(amount);
};

export default formatMoney;
