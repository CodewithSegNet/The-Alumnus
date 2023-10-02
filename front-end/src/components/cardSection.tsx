import {
  Badge,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { IconCookie, IconGauge, IconUser } from "@tabler/icons-react";

const mockdata = [
  {
    title: "Objective",
    description:
      "To provide a platform for the alumni to network, reconnect, and exchange ideas on academic, professional, cultural and social issues.",
    icon: IconGauge,
  },
  {
    title: "Already a Member?",
    description:
      "If you are already a member of the Schools Alumni Association, check with your chapter’s Alumni Database to verify that your name is already there with all relevant information.",
    icon: IconUser,
  },
  {
    title: "Get Involved",
    description:
      "The Alumnus offers a platform to get involved. The generosity of your time will make a big difference. Consider getting involved today!",
    icon: IconCookie,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: "#03045E",
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: "#03045E",
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

const CardSectionComponent = () => {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={rem(50)} stroke={2} color={"#03045E"} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group position="center">
        <Badge color="#03045E" variant="filled" size="lg">
          GET CONNECTED & STAY INFORMED
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Get plugged into the Lorem school family today!.
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Most of us still remember our time at lorem school as some of our
        happiest memories.
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default CardSectionComponent;
