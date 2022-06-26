const CURRENCIES = {
  EUR: { exponent: 2, symbol: "€" },
};

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
  const [amount, currency] = string.split("/");
  return { amount, currency };
}

/**
 * Format a money object into a human-readable string.
 * @param {Money} money
 * @returns {String}
 */
export function format(money) {
  const currency = CURRENCIES[money.currency];

  // If the formatting options are unknown, default to serialzing the object
  // So it's at least a *little* readable
  if (!currency) return serialize(money);

  const { exponent, symbol } = currency;

  const number = formatNumber(money.amount, exponent);
  return number + symbol;
}

function formatNumber(amount, exponent) {
  const integer = amount.slice(0, -exponent) || "0";
  const decimal = amount.slice(-exponent);
  return integer + "," + decimal;
}
