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
  const isCompanySearch = type === "companies";
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const [kycSearchTerm, setKycSearchTerm] = useState("");
  const isActive = debouncedSearchTerm.trim().length > 0;

  /* -----------------------------
     Companies infinite scroll state
  ------------------------------ */
  const [page, setPage] = useState(1);
  const [companyResults, setCompanyResults] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  /* Reset pagination when search changes */
  useEffect(() => {
    if (type === "companies") {
      setPage(1);
      setCompanyResults([]);
      setHasMore(true);
    }
  }, [debouncedSearchTerm, type]);

  /* -----------------------------
     Queries
  ------------------------------ */
  const crimeQuery = useSearchCrime(
    debouncedSearchTerm,
    type === "crime" && isActive
  );

  const pepQuery = useSearchPep(
    debouncedSearchTerm,
    type === "pep" && isActive
  );

  const companiesQuery = useCompanies(
    debouncedSearchTerm,
    page,
    PAGE_SIZE,
    type === "companies" && isActive
  );

  /* Append company results */
  useEffect(() => {
    if (!companiesQuery.data) return;

    const { data, pagination } = companiesQuery.data;

    setCompanyResults((prev) => (page === 1 ? data : [...prev, ...data]));

    setHasMore(!!pagination && pagination.page < pagination.total_pages);
  }, [companiesQuery.data, page]);

  /* -----------------------------
     Infinite scroll observer
  ------------------------------ */
  useEffect(() => {
    if (type !== "companies") return;
    if (!loadMoreRef.current) return;

    const scrollRoot = document.querySelector("[data-dialog-body]") || null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !companiesQuery.isFetching) {
          setPage((p) => p + 1);
        }
      },
      {
        root: scrollRoot,
        rootMargin: "200px",
      }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, companiesQuery.isFetching, type]);

  /* -----------------------------
     KYC handler
  ------------------------------ */
  const handleOnKYCSearch = () => {
    if (!kycSearchTerm.trim()) return;
    router.push(`/kyc?search=${kycSearchTerm}`);
  };

  /* -----------------------------
     Render
  ------------------------------ */
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
                  {(companiesQuery.isLoading && page === 1) ||
                  (type !== "companies" &&
                    (crimeQuery.isLoading || pepQuery.isLoading) &&
                    !isActive) ? (
                    <Flex justify="center" gap={2}>
                      <Icon
                        as={LoaderCircle}
                        animation="spin 1s linear infinite"
                      />
                      <Text>Preparing information...</Text>
                    </Flex>
                  ) : type === "companies" && companyResults.length === 0 ? (
                    <Text textAlign="center" color="fg.muted">
                      No results found.
                    </Text>
                  ) : (
                    <VStack spaceY={2}>
                      {type === "companies" &&
                        companyResults.map((company: any) => (
                          <CompanySearchCard
                            key={company.identifier.ai_code}
                            company={company}
                          />
                        ))}

                      {type === "crime" &&
                        crimeQuery.data?.map((person: any, i: number) => (
                          <CrimeSearchCard key={i} entity={person} />
                        ))}

                      {type === "pep" &&
                        pepQuery.data?.map((person: any, i: number) => (
                          <PEPSearchCard key={i} entity={person} />
                        ))}

                      {/* Infinite scroll sentinel */}
                      {type === "companies" && hasMore && (
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
