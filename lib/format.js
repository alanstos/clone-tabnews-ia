const UNITS = [
  { limit: 60, divisor: 1, singular: "segundo", plural: "segundos" },
  { limit: 3600, divisor: 60, singular: "minuto", plural: "minutos" },
  { limit: 86400, divisor: 3600, singular: "hora", plural: "horas" },
  { limit: 2592000, divisor: 86400, singular: "dia", plural: "dias" },
  { limit: 31536000, divisor: 2592000, singular: "mês", plural: "meses" },
  { limit: Infinity, divisor: 31536000, singular: "ano", plural: "anos" },
];

export function timeAgo(date, now = Date.now()) {
  const seconds = Math.max(1, Math.floor((now - new Date(date)) / 1000));
  const unit = UNITS.find((u) => seconds < u.limit);
  const value = Math.floor(seconds / unit.divisor);
  return `${value} ${value === 1 ? unit.singular : unit.plural} atrás`;
}

export function pluralize(count, singular, plural) {
  return `${count} ${count <= 1 ? singular : plural}`;
}
