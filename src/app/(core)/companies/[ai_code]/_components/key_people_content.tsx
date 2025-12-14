"use client";

import InfoItem from "@/components/info-item";
import {
  Accordion,
  Container,
  SimpleGrid,
  Span,
  VStack,
  Box,
} from "@chakra-ui/react";

interface KeyPeopleContentProps {
  keyPersonData: IKeyPerson[];
}

const KeyPeopleContent: React.FC<KeyPeopleContentProps> = ({
  keyPersonData,
}) => {
  // Group key people by their title
  const groupedByTitle = keyPersonData.reduce((acc, person) => {
    const title = person.title || "Others";
    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(person);
    return acc;
  }, {} as Record<string, IKeyPerson[]>);

  return (
    <Container>
      <Accordion.Root collapsible variant="subtle" spaceY={4}>
        {Object.entries(groupedByTitle).map(([title, people]) => (
          <Accordion.Item key={title} value={title}>
            <Accordion.ItemTrigger>
              <Span flex="1" fontSize="lg">
                {title}
              </Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody spaceY={4}>
                <VStack align="stretch" spaceY={6}>
                  {people.map((person, index) => (
                    <Box key={index} py={4}>
                      <VStack align="stretch" spaceY={3}>
                        <InfoItem label="Name" value={person.name} />
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                          {person.profession && (
                            <InfoItem
                              label="Profession"
                              value={person.profession}
                            />
                          )}
                          {person.age && (
                            <InfoItem label="Age" value={person.age} />
                          )}
                          {person.nationality && (
                            <InfoItem
                              label="Nationality"
                              value={person.nationality}
                            />
                          )}
                        </SimpleGrid>
                        {person.education_qualification && (
                          <InfoItem
                            label="Education"
                            value={person.education_qualification}
                          />
                        )}
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Container>
  );
};

export default KeyPeopleContent;
