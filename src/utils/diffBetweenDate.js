export default function diffBetweenDate(date1, date2) {
  const diff = date1.diff(date2, ["days", "hours", "minutes", "seconds"]);

  return [
    diff.toObject().days,
    diff.toObject().hours,
    diff.toObject().minutes,
    Math.floor(diff.toObject().seconds),
  ];
}
