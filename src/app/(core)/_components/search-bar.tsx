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
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";

import CompanySearchCard from "./company_search_card";
import CrimeSearchCard from "./crime_search_card";
import PEPSearchCard from "./pep_search_card";

import { useSearchCrime } from "@/hooks/use-crime";
import { useSearchPep } from "@/hooks/use-pep";
import { useCompanies } from "@/hooks/use-companies";

type SearchType = "companies" | "crime" | "pep" | "kyc";

interface SearchBarProps {
  type: SearchType | string;
}

const PAGE_SIZE = 20;

const SearchBar: React.FC<SearchBarProps> = ({ type }) => {
  const router = useRouter();
  const isCompanySearch = type === "companies";

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const [kycSearchTerm, setKycSearchTerm] = useState("");

  const isActive = debouncedSearchTerm.trim().length > 0;

  // Pagination state for all types
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Reset pagination when search term or type changes
  useEffect(() => {
    setPage(1);
    setResults([]);
    setHasMore(true);
  }, [debouncedSearchTerm, type]);

  // Queries
  const companiesQuery = useCompanies(
    debouncedSearchTerm,
    page,
    PAGE_SIZE,
    type === "companies" && isActive
  );

  const crimeQuery = useSearchCrime(
    debouncedSearchTerm,
    page,
    PAGE_SIZE,
    type === "crime" && isActive
  );

  const pepQuery = useSearchPep(
    debouncedSearchTerm,
    page,
    PAGE_SIZE,
    type === "pep" && isActive
  );

  const activeQuery = {
    companies: companiesQuery,
    crime: crimeQuery,
    pep: pepQuery,
  }[type];

  // Append results on query update
  useEffect(() => {
    if (!activeQuery?.data) return;

    const { data, pagination } = activeQuery.data;

    setResults((prev) => (page === 1 ? data : [...prev, ...data]));

    setHasMore(!!pagination && pagination.page < pagination.total_pages);
  }, [activeQuery?.data, page]);

  // Infinite scroll observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || !activeQuery) return;

    const scrollRoot = document.querySelector("[data-dialog-body]") || null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !activeQuery.isFetching) {
          setPage((p) => p + 1);
        }
      },
      { root: scrollRoot, rootMargin: "200px" }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, activeQuery, type]);

  // KYC search
  const handleOnKYCSearch = () => {
    if (!kycSearchTerm.trim()) return;
    router.push(`/kyc?search=${kycSearchTerm}`);
  };

  // Render
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
              <Text color="fg.muted">
                Search for a {isCompanySearch ? "company" : "person or entity"}.
              </Text>

              {type === "kyc" ? (
                <Flex w="full" gap={4}>
                  <Input
                    autoFocus
                    placeholder="Search entities..."
                    value={kycSearchTerm}
                    onChange={(e) => setKycSearchTerm(e.target.value)}
                  />
                  <Button
                    onClick={handleOnKYCSearch}
                    disabled={!kycSearchTerm.trim()}
                  >
                    Search
                  </Button>
                </Flex>
              ) : (
                <Input
                  autoFocus
                  placeholder={
                    isCompanySearch
                      ? "Search companies..."
                      : "Search entities..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
            </Dialog.Header>

            <Dialog.Body data-dialog-body>
              {type !== "kyc" && (
                <>
                  {activeQuery?.isLoading && page === 1 ? (
                    <Flex justify="center" gap={2}>
                      <Icon
                        as={LoaderCircle}
                        animation="spin 1s linear infinite"
                      />
                      <Text>Preparing information...</Text>
                    </Flex>
                  ) : results.length === 0 ? (
                    <Text textAlign="center" color="fg.muted">
                      No results found.
                    </Text>
                  ) : (
                    <VStack spaceY={2}>
                      {type === "companies" &&
                        results.map((company: any) => (
                          <CompanySearchCard
                            key={company.identifier.ai_code}
                            company={company}
                          />
                        ))}

                      {type === "crime" &&
                        results.map((person: any, index: number) => (
                          <CrimeSearchCard key={index} entity={person} />
                        ))}

                      {type === "pep" &&
                        results.map((person: any, index: number) => (
                          <PEPSearchCard key={index} entity={person} />
                        ))}

                      {/* Infinite scroll sentinel */}
                      {hasMore && (
                        <Flex ref={loadMoreRef} justify="center" py={4}>
                          <Icon
                            as={LoaderCircle}
                            animation="spin 1s linear infinite"
                            color="fg.muted"
                          />
                        </Flex>
                      )}
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
