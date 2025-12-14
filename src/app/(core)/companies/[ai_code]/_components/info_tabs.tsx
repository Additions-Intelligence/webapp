"use client";

import { Tabs } from "@chakra-ui/react";
import SummaryContent from "./summary_content";
import FirmographicsContent from "./firmographics_content";
import KeyPeopleContent from "./key_people_content";
import OwnershipContent from "./ownership_content";
import FinancialContent from "./financial_content";
import FinancialRatioContent from "./financial_ratio_content";
import QuantitativeContent from "./qantitative_content";
import SubsidiariesContent from "./subsidiaries_content";

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
      <Tabs.Content value="firmographics">
        <FirmographicsContent companyData={company} />
      </Tabs.Content>
      <Tabs.Content value="key_people">
        <KeyPeopleContent keyPersonData={company.key_people} />
      </Tabs.Content>
      <Tabs.Content value="ownership">
        <OwnershipContent aiCode={company.identifier.ai_code ?? ""} />
      </Tabs.Content>
      <Tabs.Content value="financials">
        <FinancialContent ai_code={company.identifier.ai_code ?? ""} />
      </Tabs.Content>
      <Tabs.Content value="financial_ratios">
        <FinancialRatioContent ai_code={company.identifier.ai_code ?? ""} />
      </Tabs.Content>
      <Tabs.Content value="quantitative_disclosure">
        <QuantitativeContent aiCode={company.identifier.ai_code ?? ""} />
      </Tabs.Content>
      <Tabs.Content value="subsidiaries">
        <SubsidiariesContent aiCode={company.identifier.ai_code ?? ""} />
      </Tabs.Content>
      <Tabs.Content value="sustainable_development">NI</Tabs.Content>
    </Tabs.Root>
  );
};

export default InfoTabs;
