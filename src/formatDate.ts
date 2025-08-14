export const formatDate = (isoString: string, locale: string = "sv-SW"): string => {
  const date = new Date(isoString)

  if (isNaN(date.getTime())) {
    return "Invalid date"
  }
  return date.toLocaleString(locale)
}
