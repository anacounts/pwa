const shortDateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

export function formatShortDate(date) {
  return shortDateFormatter.format(date);
}
