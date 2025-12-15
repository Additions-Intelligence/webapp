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
import { COMPANY_DATA, CRIME_DATA } from "@/lib/dummy_data";
import CompanySearchCard from "./company_search_card";
import CrimeSearchCard from "./crime_search_card";

type SearchType = "companies" | "crime";

interface SearchBarProps {
  type: SearchType | string;
}

interface SearchConfig<T> {
  data: T[];
  placeholder: string;
  filterFn: (item: T, term: string) => boolean;
}

const searchConfigs = {
  companies: {
    data: COMPANY_DATA,
    placeholder: "Search companies...",
    filterFn: (company: any, term: string): boolean => {
      const t = term.toLowerCase();

      const name = company.company_information.name.toLowerCase();
      const aiCode = company.identifier.ai_code?.toLowerCase() ?? "";
      const isin = company.identifier.isin?.toLowerCase() ?? "";

      return name.includes(t) || aiCode.includes(t) || isin.includes(t);
    },
  },

  // kyc: {
  //   data: KYC_DATA,
  //   placeholder: "Search KYC subjects...",
  //   filterFn: (person: IKycPerson, term: string) =>
  //     person.full_name.toLowerCase().includes(term.toLowerCase()),
  // },

  // pep: {
  //   data: PEP_DATA,
  //   placeholder: "Search PEPs...",
  //   filterFn: (pep: IPep, term: string) =>
  //     pep.name.toLowerCase().includes(term.toLowerCase()),
  // },

  crime: {
    data: CRIME_DATA,
    placeholder: "Search crime entity...",
    filterFn: (crime: any, term: string) =>
      crime.identifier.entity_name.toLowerCase().includes(term.toLowerCase()),
  },
} satisfies Record<SearchType, SearchConfig<any>>;

const SearchBar: React.FC<SearchBarProps> = ({ type }) => {
  const isCompanySearch = type === "companies";

  // get data from React Query hook
  // const { data: companiesData, isLoading } = useCompanies(isCompanySearch);
  const config = searchConfigs[type as keyof typeof searchConfigs];

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const filteredResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return config.data;
    return config.data.filter((item) =>
      config.filterFn(item, debouncedSearchTerm)
    );
  }, [config, debouncedSearchTerm]);

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
                  isCompanySearch ? "Search companies..." : "Search entities..."
                }
                value={searchTerm}
                autoFocus
                // disabled={!isCompanySearch || isLoading}
                // disabled={!isCompanySearch}
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
              ) : filteredResults.length === 0 ? (
                <Text textAlign="center" color="fg.muted">
                  No results found.
                </Text>
              ) : (
                <VStack spaceY={2}>
                  {type === "companies" &&
                    filteredResults.map((company: any) => (
                      <CompanySearchCard
                        key={company.identifier.ai_code}
                        company={company}
                      />
                    ))}

                  {type === "crime" &&
                    filteredResults.map((person: any) => (
                      <CrimeSearchCard key={person.id} entity={person} />
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
