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

const getNameFromRisk = {
  business_risks: (r: any) => r.identifier?.name,
  financial_risks: (r: any) => r.identifier?.name,
  crime_risks: (r: any) => r.identifier?.entity_name,
  pep_screenings: (r: any) => r.identifier?.person_name,
};

const normalizeName = (name: string) => name?.trim().toLowerCase();

export function aggregateRisks(
  source: Record<keyof typeof getNameFromRisk, any[]>
): AggregatedRisk[] {
  const map = new Map<string, AggregatedRisk>();

  for (const [riskType, risks] of Object.entries(source)) {
    for (const risk of risks) {
      const rawName =
        getNameFromRisk[riskType as keyof typeof getNameFromRisk](risk);
      const key = normalizeName(rawName);

      if (!map.has(key)) {
        map.set(key, {
          name: rawName,
          business_risks: [],
          financial_risks: [],
          crime_risks: [],
          pep_screenings: [],
        });
      }

      const item = map.get(key)!;
      const riskArray = item[riskType as keyof AggregatedRisk] as unknown[];
      riskArray.push(risk);
    }
  }

  return [...map.values()];
}
