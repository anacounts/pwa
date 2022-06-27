const CURRENCIES = {
  EUR: { exponent: 2, symbol: "€" },
};

function getCurrencyData(currency) {
  const data = CURRENCIES[currency];
  if (!data) {
    throw new Error("Unsupported currency: " + currency);
  }
  return data;
}

/**
 * Represents an amount of money in a currency.
 *
 * Based in Elixir's Money library.
 *
 * @typedef {Object} Money
 * @prop {Number} amount
 * @prop {String} currency
 */

/**
 * Serializes a Money object into a string.
 *
 * @param {Money} money
 * @returns {String}
 */
export function serialize(money) {
  return `${money.amount}/${money.currency}`;
}

/**
 * Parses a string representation of money.
 * Returns the corresponding Money object.
 *
 * @param {String} string
 * @returns {Money}
 */
export function parse(string) {
  const [rawAmount, currency] = string.split("/");

  const { exponent } = getCurrencyData(currency);
  const amount = formatNumber(rawAmount, exponent);

  return { amount, currency };
}

function formatNumber(amount, exponent) {
  const integer = amount.slice(0, -exponent) || "0";
  const decimal = amount.slice(-exponent);
  return integer + "." + decimal;
}

/**
 * Format a money object into a human-readable string.
 * @param {Money} money
 * @returns {String}
 */
export function format(money) {
  const { symbol } = getCurrencyData(money.currency);
  return money.amount + symbol;
}
