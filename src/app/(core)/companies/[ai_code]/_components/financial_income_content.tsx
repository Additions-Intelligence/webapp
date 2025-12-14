import { formatCurrency } from "@/lib/utils";
import { For, Heading, Table } from "@chakra-ui/react";

interface FinancialIncomeContentProps {
  incomeStatements: IFinancialItem[];
  currency: string;
}

const FinancialIncomeContent: React.FC<FinancialIncomeContentProps> = ({
  incomeStatements,
  currency,
}) => {
  const statementsByYear: Record<number, Record<string, string | null>> = {};
  const breakdowns = new Set<string>();
  const years = new Set<number>();

  // Process the data
  incomeStatements.forEach((item) => {
    years.add(item.year);
    breakdowns.add(item.financial_item_name);

    if (!statementsByYear[item.year]) {
      statementsByYear[item.year] = {};
    }
    statementsByYear[item.year][item.financial_item_name] =
      item.financial_item_value;
  });

  const sortedYears = Array.from(years).sort((a, b) => a - b);
  const sortedBreakdowns = Array.from(breakdowns).sort();

  return (
    <>
      <Heading my="4">Currency In {currency}</Heading>
      <Table.ScrollArea borderWidth="1px" rounded="md" maxW="full" mt={4}>
        <Table.Root
          css={{
            "& [data-sticky]": {
              position: "sticky",
              zIndex: 1,
              bg: "bg",

              _after: {
                content: '""',
                position: "absolute",
                pointerEvents: "none",
                top: "0",
                bottom: "-1px",
                width: "32px",
              },
            },

            "& [data-sticky=end]": {
              _after: {
                insetInlineEnd: "0",
                translate: "100% 0",
                shadow: "inset 8px 0px 8px -8px rgba(0, 0, 0, 0.16)",
              },
            },

            "& [data-sticky=start]": {
              _after: {
                insetInlineStart: "0",
                translate: "-100% 0",
                shadow: "inset -8px 0px 8px -8px rgba(0, 0, 0, 0.16)",
              },
            },
          }}
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader data-sticky="end" minW="250px" left="0">
                Breakdown
              </Table.ColumnHeader>
              <For each={sortedYears}>
                {(year) => (
                  <Table.ColumnHeader minW="200px">{year}</Table.ColumnHeader>
                )}
              </For>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <For each={sortedBreakdowns}>
              {(item, index) => (
                <Table.Row key={index}>
                  <Table.Cell data-sticky="end" left="0">
                    {item}
                  </Table.Cell>
                  <For each={sortedYears}>
                    {(year) => (
                      <Table.Cell key={year}>
                        {formatCurrency(statementsByYear[year]?.[item] || "NI")}
                      </Table.Cell>
                    )}
                  </For>
                </Table.Row>
              )}
            </For>
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </>
  );
};

export default FinancialIncomeContent;
