export function formatReadableDate(
  dateString: string | null | undefined
): string | null {
  if (!dateString) return null;

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Format currency values
export const formatCurrency = (value: string | null) => {
  if (!value) return "-";
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return value;
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numValue);
};
