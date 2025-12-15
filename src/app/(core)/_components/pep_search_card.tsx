import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

interface PEPSearchCardProps {
  entity: IPEPRecord;
}

const PEPSearchCard: React.FC<PEPSearchCardProps> = ({ entity }) => {
  return (
    <Link
      href={`/peps/${entity.identifier.person_id}`}
      style={{ width: "100%" }}
    >
      <Container
        bg="gray.100"
        p={3}
        borderRadius="md"
        spaceY={2}
        _hover={{ bg: "gray.200" }}
        cursor="pointer"
        transition="background-color 0.2s ease"
      >
        <Box>
          <Heading size="md">{entity.identifier.person_name}</Heading>
          <Flex gap={4}>
            <Flex gap={1}>
              <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                Age:
              </Text>
              <Text fontSize="sm" color="gray.500">
                {entity.personality_details.age || "NI"}
              </Text>
            </Flex>
            <Flex gap={1}>
              <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                Place of Birth:
              </Text>
              <Text fontSize="sm" color="gray.500">
                {entity.personality_details.place_of_birth || "NI"}
              </Text>
            </Flex>
            <Flex gap={1}>
              <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                Profession:
              </Text>
              <Text fontSize="sm" color="gray.500">
                {entity.personality_details.profession || "NI"}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </Link>
  );
};

export default PEPSearchCard;
