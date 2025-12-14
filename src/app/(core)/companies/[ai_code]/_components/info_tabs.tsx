"use client";

import { Tabs } from "@chakra-ui/react";
import SummaryContent from "./summary_content";

interface InfoTabsProps {
  company: ICompany;
}

const InfoTabs: React.FC<InfoTabsProps> = ({ company }) => {
  return (
    <Tabs.Root defaultValue="summary" variant="subtle" mt={8}>
      <Tabs.List>
        <Tabs.Trigger value="summary">Summary</Tabs.Trigger>
        <Tabs.Trigger value="firmographics">Firmographics</Tabs.Trigger>
        <Tabs.Trigger value="key_people">Key People</Tabs.Trigger>
        <Tabs.Trigger value="ownership">Ownership</Tabs.Trigger>
        <Tabs.Trigger value="financials">Financials</Tabs.Trigger>
        <Tabs.Trigger value="financial_ratios">Financial Ratios</Tabs.Trigger>
        <Tabs.Trigger value="quantitative_disclosure">
          Quantitative Disclosure
        </Tabs.Trigger>
        <Tabs.Trigger value="subsidiaries">Subsidiaries</Tabs.Trigger>
        <Tabs.Trigger value="sustainable_development">
          Sustainable Development
        </Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="summary">
        <SummaryContent
          summaryData={{
            ai_code: company.identifier.ai_code,
            isin: company.identifier.isin,
            sector: company.sector.sector,
            description: company.company_information.description || "test",
            number_of_employees: company.number_of_employees[-1],
            number_of_branches: company.number_of_branches[-1],
            listed: company.market_information.listed,
            country: company.location.country_of_incorporation,
          }}
        />
      </Tabs.Content>
      <Tabs.Content value="firmographics">Firmographics content</Tabs.Content>
      <Tabs.Content value="key_people">Key people content</Tabs.Content>
      <Tabs.Content value="ownership">Ownership content</Tabs.Content>
      <Tabs.Content value="financials">Financials content</Tabs.Content>
      <Tabs.Content value="financial_ratios">
        Financial Ratios content
      </Tabs.Content>
      <Tabs.Content value="quantitative_disclosure">
        Quantitative Disclosure content
      </Tabs.Content>
      <Tabs.Content value="subsidiaries">Subsidiaries content</Tabs.Content>
      <Tabs.Content value="sustainable_development">
        Sustainable development content
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default InfoTabs;
