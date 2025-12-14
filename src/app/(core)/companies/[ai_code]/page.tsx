import { COMPANY_DATA } from "@/lib/dummy_data";
import { Box, Container, Heading, Separator } from "@chakra-ui/react";
import InfoTabs from "./_components/info_tabs";
import Navbar from "../../_components/navbar";

export default async function CompanyPage({
  params,
}: {
  params: { ai_code: string };
}) {
  const aiCode = (await params).ai_code;
  const companyData = COMPANY_DATA.find(
    (company) => company.identifier.ai_code === aiCode
  );
  return (
    <>
      <Navbar />
      <Container maxW="7xl" py={8}>
        {companyData ? (
          <Box>
            <Heading size="3xl" mb={4}>
              {companyData.company_information.name} (
              {companyData.market_information.listings[0]?.symbol})
            </Heading>
            <Separator />
            <InfoTabs company={companyData} />
          </Box>
        ) : (
          <p>Company not found</p>
        )}
      </Container>
    </>
  );
}
