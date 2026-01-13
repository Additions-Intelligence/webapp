import { formatCurrency } from "@/lib/utils";
import { Box, For, Heading, Table, Text } from "@chakra-ui/react";

interface FinancialCashFlowContentProps {
  cashFlows: IFinancialItem[];
  currency: string;
}

interface GroupedItems {
  [subCategory: string]: {
    items: {
      name: string;
      values: Record<number, string | null>;
    }[];
  };
}

const FinancialCashFlowContent: React.FC<FinancialCashFlowContentProps> = ({
  cashFlows,
  currency,
}) => {
  const years = new Set<number>();
  const groupedItems: GroupedItems = {};

  // Process and group the data by subcategory
  cashFlows.forEach((item) => {
    years.add(item.year);
    const subCategory = item.sub_category || "Other";

    if (!groupedItems[subCategory]) {
      groupedItems[subCategory] = { items: [] };
    }

    // Find or create the item in the subcategory
    let itemEntry = groupedItems[subCategory].items.find(
      (i) => i.name === item.financial_item_name
    );

    if (!itemEntry) {
      itemEntry = { name: item.financial_item_name, values: {} };
      groupedItems[subCategory].items.push(itemEntry);
    }

    // Add the value for this year
    itemEntry.values[item.year] = item.financial_item_value;
  });

  const sortedYears = Array.from(years).sort((a, b) => a - b);

  // Sort subcategories and their items
  const sortedSubCategories = Object.keys(groupedItems).sort();
  sortedSubCategories.forEach((subCategory) => {
    groupedItems[subCategory].items.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  });

  return (
    <Box>
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
            <For each={sortedSubCategories}>
              {(subCategory) => (
                <>
                  {/* Subcategory Header Row */}
                  <Table.Row bg="gray.50" _dark={{ bg: "gray.800" }}>
                    <Table.Cell
                      colSpan={sortedYears.length + 1} // +1 for the first column
                      fontWeight="bold"
                      fontSize="md"
                      py={2}
                      px={4}
                    >
                      {subCategory}
                    </Table.Cell>
                  </Table.Row>

                  {/* Items in this subcategory */}
                  <For each={groupedItems[subCategory].items}>
                    {(item) => (
                      <Table.Row key={item.name}>
                        <Table.Cell data-sticky="end" left="0" pl={8}>
                          {item.name}
                        </Table.Cell>
                        <For each={sortedYears}>
                          {(year) => (
                            <Table.Cell>{item.values[year] || "NI"}</Table.Cell>
                          )}
                        </For>
                      </Table.Row>
                    )}
                  </For>
                </>
              )}
            </For>
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
};

export default FinancialCashFlowContent;
