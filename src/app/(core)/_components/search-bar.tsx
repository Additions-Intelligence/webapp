"use client";

import {
  Button,
  Dialog,
  Flex,
  Icon,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LoaderCircle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import CompanySearchCard from "./company_search_card";
import CrimeSearchCard from "./crime_search_card";
import { useSearchCrime } from "@/hooks/use-crime";
import { useSearchPep } from "@/hooks/use-pep";
import PEPSearchCard from "./pep_search_card";
import { useRouter } from "next/navigation";

type SearchType = "companies" | "crime" | "kyc";

interface SearchBarProps {
  type: SearchType | string;
}

const SearchBar: React.FC<SearchBarProps> = ({ type }) => {
  const isCompanySearch = type === "companies";

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const [kycSearchTerm, setKycSearchTerm] = useState("");

  const isActive = debouncedSearchTerm.trim().length > 0;

  const crimeQuery = useSearchCrime(
    debouncedSearchTerm,
    type === "crime" && isActive
  );

  const pepQuery = useSearchPep(
    debouncedSearchTerm,
    type === "pep" && isActive
  );

  const activeQuery = {
    crime: crimeQuery,
    pep: pepQuery,
  }[type];

  const { data = [], isLoading, isFetching, error } = activeQuery ?? {};

  const handleOnKYCSearch = () => {
    if (kycSearchTerm.trim().length <= 0) {
      return;
    }

    router.push(`/kyc?search=${kycSearchTerm}`);
  };

  return (
    <Dialog.Root placement="center" size="lg" scrollBehavior="inside">
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
              {type === "kyc" ? (
                <Flex w="full" gap={4}>
                  <Input
                    placeholder="Search entities..."
                    value={kycSearchTerm}
                    autoFocus
                    // disabled={!isCompanySearch || isLoading}
                    // disabled={!isCompanySearch}
                    onChange={(e) => setKycSearchTerm(e.target.value)}
                    w="full"
                  />
                  <Button
                    onClick={handleOnKYCSearch}
                    disabled={kycSearchTerm.trim().length === 0}
                  >
                    Search
                  </Button>
                </Flex>
              ) : (
                <Input
                  placeholder={
                    isCompanySearch
                      ? "Search companies..."
                      : "Search entities..."
                  }
                  value={searchTerm}
                  autoFocus
                  // disabled={!isCompanySearch || isLoading}
                  // disabled={!isCompanySearch}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
            </Dialog.Header>

            <Dialog.Body>
              {type !== "kyc" && (
                <>
                  {isLoading || isFetching ? (
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
                  ) : data.length === 0 ? (
                    <Text textAlign="center" color="fg.muted">
                      No results found.
                    </Text>
                  ) : (
                    <VStack spaceY={2}>
                      {type === "companies" &&
                        data.map((company: any) => (
                          <CompanySearchCard
                            key={company.identifier.ai_code}
                            company={company}
                          />
                        ))}

                      {type === "crime" &&
                        data.map((person: any, index: number) => (
                          <CrimeSearchCard key={index} entity={person} />
                        ))}

                      {type === "pep" &&
                        data.map((person: any, index: number) => (
                          <PEPSearchCard key={index} entity={person} />
                        ))}
                    </VStack>
                  )}
                </>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SearchBar;
