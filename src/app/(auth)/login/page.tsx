import { Container, Text, Fieldset, Stack, Field, Input, Button, Box, Link, Flex } from "@chakra-ui/react";

export default function Login() {
    return (
        <Container maxW="lg" w="full" h="100vh" display="flex" flexDirection="column" justifyContent="center">
            <Text fontSize="2xl" color="var(--primary)" fontWeight="bold" mb="16" textAlign="center">Addition Intelligence</Text>
            <Fieldset.Root size="lg">
                <Stack>
                    <Fieldset.Legend fontSize="initial">Welcome back</Fieldset.Legend>
                    <Fieldset.HelperText fontSize="sm">
                        Login to your addition intelligence account to continue
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label fontSize="sm">Work email</Field.Label>
                        <Input variant="subtle" name="email" type="email" placeholder="Enter your work email address" />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label fontSize="sm">Password</Field.Label>
                        <Input variant="subtle" name="password" type="password" placeholder="Enter your password" />
                        <Flex w="full" justifyContent="flex-end">
                            <Link href="/" fontSize="sm" fontWeight="medium" color="blue.700">Forgot password?</Link>
                        </Flex>
                    </Field.Root>
                </Fieldset.Content>

                <Button type="submit" alignSelf="flex-start" w="full" bg={{ _dark: "gray.600", base: "var(--primary)" }} color={{ base: "white" }}>
                    Login
                </Button>
            </Fieldset.Root>
        </Container>
    )
}
