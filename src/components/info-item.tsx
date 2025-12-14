import { Flex, Text } from "@chakra-ui/react";

const InfoItem: React.FC<{
  label: string;
  value: string | number | null | undefined;
}> = ({ label, value }) => {
  return (
    <Flex gap={2}>
      <Text fontWeight="medium">{label}:</Text>
      <Text>{value || "NI"}</Text>
    </Flex>
  );
};

export default InfoItem;
