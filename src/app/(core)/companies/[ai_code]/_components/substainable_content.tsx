import InfoItem from "@/components/info-item";
import { useCompanySustainableDevelopment } from "@/hooks/use-companies";
import { Container, Text, Heading, Tabs, For, Flex, Table, Box, Separator } from "@chakra-ui/react";

interface SustainabilityContentProps {
    aiCode: string;
}

const SubstainableContent = ({ aiCode }: SustainabilityContentProps) => {
    const { data: sustainableData, isLoading } = useCompanySustainableDevelopment(
        aiCode,
        true
    );
    if (isLoading) {
        return (
            <Container>
                <Text fontSize="lg">Loading sustainable data...</Text>
            </Container>
        );
    }
    if (!sustainableData || sustainableData.length === 0) {
        return (
            <Container>
                <Text fontSize="lg">No sustainable data available.</Text>
            </Container>
        );
    }

    const sustainable = sustainableData[0];
    const research_years = sustainable.research_years;
    return (
        <Container mt="4">
            <Heading mb="2">Research Years</Heading>
            <Tabs.Root defaultValue={research_years[0].year.toString()}>
                <Tabs.List>
                    {research_years.map((data, index) => (
                        <Tabs.Trigger key={index} value={data.year.toString()}>{data.year}</Tabs.Trigger>
                    ))}
                </Tabs.List>

                <For each={research_years}>
                    {(data, index) => (
                        <Tabs.Content key={index} value={data.year.toString()}>
                            <Flex gap="8" mt="4">
                                <InfoItem
                                    label="Score"
                                    value={data.scale.score}
                                />
                                <InfoItem
                                    label="Measure Used"
                                    value={data.scale.measure_used}
                                />
                            </Flex>
                            <Heading size="2xl" mb="4" mt="6">Themes</Heading>
                            <Table.Root variant="outline">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader w="20%">Theme</Table.ColumnHeader>
                                        <Table.ColumnHeader w="80%">Product and Services</Table.ColumnHeader>

                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <For each={data.themes}>
                                        {(theme, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell alignContent="start" w="20%">
                                                    <Text fontSize="md">{theme.theme}</Text>
                                                </Table.Cell>
                                                <Table.Cell w="80%">
                                                    <For each={theme.product_services}>
                                                        {(product_service, index) => (
                                                            <Box key={index} spaceY={4} mb={4}>
                                                                <Text fontWeight="medium">{product_service.product_name}</Text>
                                                                <Text>{product_service.description}</Text>
                                                                {index < theme.product_services.length - 1 && <Separator />}
                                                            </Box>
                                                        )}
                                                    </For>
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    </For>
                                </Table.Body>
                            </Table.Root>
                        </Tabs.Content>
                    )}
                </For>
            </Tabs.Root>
        </Container>
    )
}

export default SubstainableContent;
