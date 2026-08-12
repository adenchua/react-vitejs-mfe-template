import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import { ExampleWidget } from "../components/ExampleWidget";

interface ExampleQueryResult {
  message: string;
}

// Local mock resolved via a fake delay — deliberately not a real network
// call, so the standalone dev server has no external dependency.
async function fetchExampleMessage(): Promise<ExampleQueryResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Hello from TanStack Query" });
    }, 500);
  });
}

export function ExamplePage(): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ["example"],
    queryFn: fetchExampleMessage,
  });

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">
          {import.meta.env.VITE_APP_TITLE}
        </Typography>

        <Box>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Typography variant="body1">{data?.message}</Typography>
          )}
        </Box>

        <ExampleWidget />
      </Stack>
    </Container>
  );
}

export default ExamplePage;
