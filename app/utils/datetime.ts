export const getLocalizedDateString = (
  options: Intl.DateTimeFormatOptions,
  date?: Date
) => new Date(date ?? new Date()).toLocaleDateString("default", { ...options });
