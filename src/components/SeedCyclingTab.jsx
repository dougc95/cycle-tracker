import { Typography, List, ListItem, Box } from "@mui/material";

const SeedCyclingTab = () => {
  return (
    <Box p={3}>
      <Typography variant="h2" gutterBottom>
        What is Seed Cycling?
      </Typography>
      <Typography variant="body1" paragraph>
        Seed cycling is a natural approach to balance hormones by consuming
        specific seeds during different phases of the menstrual cycle.
      </Typography>

      <Typography variant="h3" gutterBottom>
        How It Works
      </Typography>
      <Typography variant="body1" paragraph>
        During the Follicular Phase, consume flaxseeds and pumpkin seeds. In the
        Luteal Phase, switch to sesame and sunflower seeds.
      </Typography>

      <Typography variant="h3" gutterBottom>
        Seed Preparation Tips
      </Typography>
      <List>
        <ListItem sx={{ display: "list-item" }}>
          Grind seeds fresh to enhance absorption.
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          Store in a cool, dark place.
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          Add to smoothies, salads, or yogurt.
        </ListItem>
      </List>

      <Typography variant="h3" gutterBottom>
        Benefits
      </Typography>
      <List>
        <ListItem sx={{ display: "list-item" }}>
          Helps regulate hormones.
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>Reduces PMS symptoms.</ListItem>
        <ListItem sx={{ display: "list-item" }}>
          Supports reproductive health.
        </ListItem>
      </List>

      {/* Static cycle chart can be added here if desired */}
    </Box>
  );
};

export default SeedCyclingTab;
