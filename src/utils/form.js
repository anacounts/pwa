// TODO Refactor forms to use `toObject`

/**
 * Converts a form data object to a normalized data object.
 *
 * @param {FormData} formData
 * @returns {Object}
 */
export function toObject(formData) {
  let acc = {};
  for (const entry of formData) {
    acc = decodePair(entry, acc);
  }
  return acc;
}

// Heavily inspired by Plug's `decodePair`
// https://github.com/elixir-plug/plug/blob/6f03124e0aad11cf4d87aed80920eb4313f82c14/lib/plug/conn/query.ex#L133
function decodePair([key, value], acc) {
  if (key !== "" && key[key.length - 1] === "]") {
    // Remove trailing ]
    const subkey = key.slice(0, -1);

    // Split the first [ then we will split on remaining ][.
    //
    //     users[address][street #=> [ "users", "address][street" ]
    //
    return assignSplit(splitOnce(subkey, "["), value, acc);
  } else {
    return assignMap(acc, key, value);
  }
}

function assignSplit(splitted, value, acc) {
  if (splitted.length === 2) {
    const [key, rest] = splitted;
    const parts = splitOnce(rest, "][");

    if (key === "") {
      return acc === undefined
        ? [assignSplit(parts, value, undefined)]
        : [assignSplit(parts, value, undefined), ...acc];
    }

    return Object.assign({}, acc, {
      [key]: assignSplit(parts, value, acc?.[key]),
    });
  }

  if (splitted.length === 1 && splitted[0] === "") {
    if (value === undefined) {
      return Array.isArray(acc) ? acc : [];
    }

    if (Array.isArray(acc)) {
      return [value, ...acc];
    }

    return [value];
  }

  // At this point, `splitted` should always be a one-entry array
  // Let it crash if it's not the case
  return assignMap(acc, splitted[0], value);
}

function assignMap(acc, key, value) {
  if (typeof acc !== "object") {
    return { [key]: value };
  }
  if (!(key in acc)) {
    acc[key] = value;
  }
  return acc;
}

function splitOnce(string, pattern) {
  const splitIdx = string.indexOf(pattern);
  return splitIdx === -1
    ? [string]
    : [string.slice(0, splitIdx), string.slice(splitIdx + pattern.length)];
}
