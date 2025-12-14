import { FINANCIAL_STATEMENTS } from "@/lib/dummy_data";
import { Container, Tabs } from "@chakra-ui/react";
import FinancialIncomeContent from "./financial_income_content";
import FinancialBalanceContent from "./financial_balance_content";
import FinancialCashFlowContent from "./financial_cash_flow_content";

interface FinancialContentProps {
  ai_code: string;
}

const FinancialContent: React.FC<FinancialContentProps> = ({ ai_code }) => {
  const financialData = FINANCIAL_STATEMENTS.find(
    (statement) => statement.identifier.ai_code === ai_code
  );
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
            incomeStatements={financialData?.income_statements || []}
            currency={financialData?.currency.symbol || "GHS"}
          />
        </Tabs.Content>
        <Tabs.Content value="balance_sheet">
          <FinancialBalanceContent
            balanceSheet={financialData?.balance_sheets || []}
            currency={financialData?.currency.symbol || "GHS"}
          />
        </Tabs.Content>
        <Tabs.Content value="cash_flow">
          <FinancialCashFlowContent
            cashFlows={financialData?.cash_flow_statements || []}
            currency={financialData?.currency.symbol || "GHS"}
          />
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
};

export default FinancialContent;
