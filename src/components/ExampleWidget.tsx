import type { JSX } from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";

export function ExampleWidget(): JSX.Element {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <WidgetsIcon color="primary" />
          <Typography variant="subtitle1">Example Widget</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          A small, self-contained component with no router or query dependency — the finest-grained
          federation expose in this remote.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ExampleWidget;
