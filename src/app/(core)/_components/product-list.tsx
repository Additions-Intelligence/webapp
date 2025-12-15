import { HStack, RadioCard } from "@chakra-ui/react";

const products = [
  {
    slug: "companies",
    name: "Company Information",
    description:
      "Addition Intelligence company insights. Search for a company to get started.",
  },
  {
    slug: "kyc",
    name: "KYC",
    description:
      "Addition Intelligence KYC Database. Search for a customer to get started.",
  },
  {
    slug: "pep",
    name: "PEP",
    description:
      "Addition Intelligence PEP Database. Search for any entity to get started.",
  },
  {
    slug: "crime",
    name: "Crime",
    description:
      "Addition Intelligence Crime Database. Search for any entity to get started.",
  },
];

interface ProductListProps {
  onProductSelect: (product: string | null) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onProductSelect }) => {
  return (
    <RadioCard.Root
      defaultValue="companies"
      onValueChange={(result) => {
        console.log("Selected product:", result.value);
        onProductSelect(result.value);
      }}
    >
      <HStack align="stretch">
        {products.map((item) => (
          <RadioCard.Item key={item.slug} value={item.slug}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemContent>
                <RadioCard.ItemText>{item.name}</RadioCard.ItemText>
                <RadioCard.ItemDescription>
                  {item.description}
                </RadioCard.ItemDescription>
              </RadioCard.ItemContent>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  );
};

export default ProductList;
