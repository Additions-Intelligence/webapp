"use client";

import InfoItem from "@/components/info-item";
import { formatReadableDate } from "@/lib/utils";
import {
  Accordion,
  Container,
  SimpleGrid,
  Span,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
} from "recharts";

interface FirmographicsContentProps {
  // Define props if needed
  companyData: ICompany; // Replace 'any' with actual type
}

const FirmographicsContent: React.FC<FirmographicsContentProps> = ({
  companyData,
}) => {
  const [value, setValue] = useState([""]);
  return (
    <Container p={4}>
      <Accordion.Root
        value={value}
        onValueChange={(e) => setValue(e.value)}
        variant="subtle"
        spaceY={4}
      >
        <Accordion.Item value="identifier">
          <Accordion.ItemTrigger>
            <Span flex="1" fontSize="lg">
              Identifier
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
                <InfoItem
                  label="AI Code"
                  value={companyData.identifier.ai_code}
                />
                <InfoItem label="ISIN" value={companyData.identifier.isin} />
                <InfoItem
                  label="Registration Number"
                  value={companyData.identifier.registration_number}
                />
              </SimpleGrid>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="company_info">
          <Accordion.ItemTrigger>
            <Span flex="1" fontSize="lg">
              Company Information
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody spaceY={4}>
              <InfoItem
                label="Company Name"
                value={companyData.company_information.name}
              />
              <InfoItem
                label="Holding Company"
                value={companyData.company_information.holding_company}
              />
              <InfoItem
                label="Description"
                value={companyData.company_information.description}
              />
              <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
                <InfoItem
                  label="Status"
                  value={companyData.company_information.status}
                />
                <InfoItem
                  label="Corporate Action"
                  value={companyData.company_information.corporate_action}
                />
                <InfoItem
                  label="Incorporation Year"
                  value={companyData.company_information.date_of_incorporation}
                />
              </SimpleGrid>
              <InfoItem
                label="Incorporation Note"
                value={companyData.company_information.incorporation_note}
              />
              <InfoItem
                label="Accounting Standard"
                value={companyData.company_information.accounting_standard}
              />
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="contact_info">
          <Accordion.ItemTrigger>
            <Span flex="1" fontSize="lg">
              Contact Information
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <SimpleGrid columns={2} gap={4}>
                <InfoItem label="Website" value={companyData.contact.website} />
                <InfoItem
                  label="Email"
                  value={companyData.contact.email_address}
                />
                <InfoItem
                  label="Telephone Number"
                  value={companyData.contact.telephone_no}
                />
                <InfoItem label="Fax" value={companyData.contact.fax} />
              </SimpleGrid>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="market_info">
          <Accordion.ItemTrigger>
            <Span flex="1">Market Information</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Country</Table.ColumnHeader>
                    <Table.ColumnHeader>Stock Exchange</Table.ColumnHeader>
                    <Table.ColumnHeader>Symbol</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">
                      Date Listed
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {companyData.market_information.listings.map(
                    (item, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>{item.country}</Table.Cell>
                        <Table.Cell>{item.stock_exchange}</Table.Cell>
                        <Table.Cell>{item.symbol}</Table.Cell>
                        <Table.Cell textAlign="end">
                          {formatReadableDate(item.date_listed)}
                        </Table.Cell>
                      </Table.Row>
                    )
                  )}
                </Table.Body>
              </Table.Root>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="industry">
          <Accordion.ItemTrigger>
            <Span flex="1" fontSize="lg">
              Industry Segmentation
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody spaceY={4}>
              <SimpleGrid columns={2} gap={4}>
                <InfoItem label="Sector" value={companyData.sector.sector} />
                <InfoItem
                  label="Operational Classification"
                  value={companyData.sector.operational_classification}
                />
                <InfoItem
                  label="Sub-Sector"
                  value={companyData.sector.subsector_activities}
                />
                <InfoItem
                  label="State Owned"
                  value={companyData.sector.state_owned}
                />
                <InfoItem
                  label="Nace Sector"
                  value={companyData.sector.nace_sector}
                />
              </SimpleGrid>
              <InfoItem
                label="Key Production Activities"
                value={companyData.sector.keywords_products_activities}
              />
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="location_info">
          <Accordion.ItemTrigger>
            <Span flex="1" fontSize="lg">
              Location Information
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody spaceY={4}>
              <SimpleGrid columns={2} gap={4}>
                <InfoItem label="Sector" value={companyData.sector.sector} />
                <InfoItem
                  label="Country of Incorporation"
                  value={companyData.location.country_of_incorporation}
                />
                <InfoItem
                  label="Head Office"
                  value={companyData.location.head_office_location}
                />
                <InfoItem label="Region" value={companyData.location.region} />
                <InfoItem
                  label="Digital Address"
                  value={companyData.location.digital_address}
                />
                <InfoItem
                  label="Continent"
                  value={companyData.location.continent}
                />
                <InfoItem
                  label="Postal Address"
                  value={companyData.location.postal_address}
                />
                <InfoItem
                  label="Sub-Continent"
                  value={companyData.location.sub_continent}
                />
                <InfoItem
                  label="GPS Coordinates"
                  value={companyData.location.gps_coordinates}
                />
              </SimpleGrid>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="competition_info">
          <Accordion.ItemTrigger>
            <Span flex="1" fontSize="lg">
              Competition Information
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody spaceY={4}>
              {companyData.competitors?.map((competitor, index) => (
                <Text key={index}>{competitor.name}</Text>
              ))}
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="organization_size">
          <Accordion.ItemTrigger>
            <Span flex="1" fontSize="lg">
              Organization Size
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody spaceY={4}>
              <EmployeesBranchesAreaChart
                numberOfBranches={companyData.number_of_branches}
                numberOfEmployees={companyData.number_of_employees}
              />
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="solicitor_info">
          <Accordion.ItemTrigger>
            <Span flex="1" fontSize="lg">
              Solicitor Information
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody spaceY={4}>
              {companyData.solicitors.map((solicitor, index) => (
                <Stack key={index}>
                  <InfoItem label="Year" value={solicitor.year} />
                  <Text>{solicitor.name}</Text>
                </Stack>
              ))}
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="auditor_info">
          <Accordion.ItemTrigger>
            <Span flex="1" fontSize="lg">
              Auditor Information
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody spaceY={4}>
              {companyData.auditors.map((auditor, index) => (
                <Stack key={index}>
                  <InfoItem label="Year" value={auditor.year} />
                  <Text>{auditor.name}</Text>
                </Stack>
              ))}
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Container>
  );
};

export default FirmographicsContent;

function EmployeesBranchesAreaChart({
  numberOfBranches,
  numberOfEmployees,
}: {
  numberOfBranches: IBranchCount[];
  numberOfEmployees: IEmployeeCount[];
}) {
  const chart = useChart({
    data: buildYearlyAreaData(numberOfBranches, numberOfEmployees),
    series: [
      { name: "employees", color: "teal.solid" },
      { name: "branches", color: "purple.solid" },
    ],
  });

  return (
    <Chart.Root maxH="xs" chart={chart}>
      <AreaChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />

        <XAxis dataKey={chart.key("year")} axisLine={false} tickLine={false} />

        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip />}
        />

        <Legend content={<Chart.Legend />} />

        {chart.series.map((item, index) => (
          <Area
            key={index}
            dataKey={String(chart.key(item.name))}
            isAnimationActive={false}
            fill={chart.color(item.color)}
            fillOpacity={0.25}
            stroke={chart.color(item.color)}
            connectNulls={false}
            stackId="a"
          />
        ))}
      </AreaChart>
    </Chart.Root>
  );
}

function buildYearlyAreaData(
  branches: IBranchCount[],
  employees: IEmployeeCount[]
) {
  const map = new Map();

  branches.forEach((item) => {
    map.set(item.year, {
      year: item.year,
      branches:
        item.number_of_branches === "NI"
          ? null
          : Number(item.number_of_branches),
      employees: null,
    });
  });

  employees.forEach((item) => {
    const existing = map.get(item.year) || {
      year: item.year,
      branches: null,
      employees: null,
    };

    existing.employees =
      item.number_of_employees === "NI"
        ? null
        : Number(item.number_of_employees);

    map.set(item.year, existing);
  });

  return Array.from(map.values()).sort((a, b) => a.year - b.year);
}
