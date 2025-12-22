import { FINANCIAL_STATEMENTS } from "@/lib/dummy_data";
import { Container, Tabs, Text } from "@chakra-ui/react";
import FinancialIncomeContent from "./financial_income_content";
import FinancialBalanceContent from "./financial_balance_content";
import FinancialCashFlowContent from "./financial_cash_flow_content";
import { useCompanyFinancials } from "@/hooks/use-companies";

interface FinancialContentProps {
  ai_code: string;
}

const FinancialContent: React.FC<FinancialContentProps> = ({ ai_code }) => {
  const { data: financialData, isLoading } = useCompanyFinancials(
    ai_code,
    true
  );
  if (isLoading) {
    return (
      <Container>
        <Text fontSize="lg">Loading financial data...</Text>
      </Container>
    );
  }
  if (!financialData || financialData.length === 0) {
    return (
      <Container>
        <Text fontSize="lg">No financial data available.</Text>
      </Container>
    );
  }

  const processedData = financialData[0]; // Assuming we take the first entry
  return (
    <Container>
      <Tabs.Root defaultValue="income_statement">
        <Tabs.List>
          <Tabs.Trigger value="income_statement">Income Statement</Tabs.Trigger>
          <Tabs.Trigger value="balance_sheet">Balance Sheet</Tabs.Trigger>
          <Tabs.Trigger value="cash_flow">Cash Flow</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="income_statement">
          <FinancialIncomeContent
            incomeStatements={processedData?.income_statements || []}
            currency={processedData?.currency.symbol || "GHS"}
          />
        </Tabs.Content>
        <Tabs.Content value="balance_sheet">
          <FinancialBalanceContent
            balanceSheet={processedData?.balance_sheets || []}
            currency={processedData?.currency.symbol || "GHS"}
          />
        </Tabs.Content>
        <Tabs.Content value="cash_flow">
          <FinancialCashFlowContent
            cashFlows={processedData?.cash_flow_statements || []}
            currency={processedData?.currency.symbol || "GHS"}
          />
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
};

export default FinancialContent;
