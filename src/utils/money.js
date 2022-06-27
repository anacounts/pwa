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
 * Create a Money object from its equivalent object data.
 *
 * Object data are objects representing data of forms, usually created using
 * `form.toObject(new FormData(formEl))`.
 *
 * A money object data must contain an "amount" and a "currency" key.
 * Debugging hint: Keep in mind that disabled fields do not get into `FormData` objects.
 *
 * @param {Object} data An object data created from a form.
 *
 * @returns {Money}
 */
export function fromObjectData(data) {
  const { amount: rawAmount, currency } = data;
  const amount = parseAmount(rawAmount, currency);

  return { amount, currency };
}

// Parses an amount from a string, for a specified currency.
function parseAmount(string, currency) {
  if (!(currency in CURRENCIES)) throw new Error("Currency not found");

  // The string already includes decimal delimiter,
  // the amount is correct already.
  if (string.includes(".")) {
    return string;
  }

  const { exponent } = CURRENCIES[currency];
  return string + "." + "0".repeat(exponent);
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
