import {
  Button,
  Dialog,
  Icon,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LoaderCircle, Search } from "lucide-react";
import { useCompanies } from "@/hooks/useCompanies";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { COMPANY_DATA } from "@/lib/dummy_data";
import CompanySearchCard from "./company_search_card";

interface SearchBarProps {
  type: "companies" | "kyc" | "pep" | "crime" | string;
}

const SearchBar: React.FC<SearchBarProps> = ({ type }) => {
  const isCompanySearch = type === "companies";

  // get data from React Query hook
  // const { data: companiesData, isLoading } = useCompanies(isCompanySearch);
  const companiesData = COMPANY_DATA;

  // local state for search input
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // filter companies
  const filteredCompanies = useMemo(() => {
    const companies = companiesData || []; // <- ensure actual array

    console.log(companies);

    if (!debouncedSearchTerm.trim()) return companies;

    const term = debouncedSearchTerm.toLowerCase();

    return companies.filter((company: ICompany) => {
      const name = company.company_information.name.toLowerCase();
      const aiCode = company.identifier.ai_code?.toLowerCase() || "";
      const isin = company.identifier.isin?.toLowerCase() || "";
      return (
        name.includes(term) || aiCode.includes(term) || isin.includes(term)
      );
    });
  }, [companiesData, debouncedSearchTerm]);

  return (
    <Dialog.Root placement="center" size="lg">
      <Dialog.Trigger asChild>
        <Button
          size="lg"
          w="full"
          variant="subtle"
          rounded="lg"
          justifyContent="flex-start"
          mb="8"
        >
          <Icon>
            <Search />
          </Icon>
          Search...
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header flexDirection="column" alignItems="flex-start">
              <Text textAlign="center" color="fg.muted">
                Search for a {isCompanySearch ? "company" : "person or entity"}.
              </Text>
              <Input
                placeholder={
                  isCompanySearch ? "Search companies..." : "Search disabled"
                }
                value={searchTerm}
                autoFocus
                // disabled={!isCompanySearch || isLoading}
                disabled={!isCompanySearch}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Dialog.Header>

            <Dialog.Body>
              {false ? (
                <Text
                  textAlign="center"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <Icon
                    as={LoaderCircle}
                    size="md"
                    animation="spin 1s linear infinite"
                  />
                  Preparing information...
                </Text>
              ) : filteredCompanies.length === 0 ? (
                <Text textAlign="center" color="fg.muted">
                  No results found.
                </Text>
              ) : (
                <VStack spaceY={2}>
                  {filteredCompanies.map((company: ICompany) => (
                    <CompanySearchCard
                      key={company.identifier.ai_code}
                      company={company}
                    />
                  ))}
                </VStack>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SearchBar;
