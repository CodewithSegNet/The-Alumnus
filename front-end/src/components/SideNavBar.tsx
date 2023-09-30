"use client";
import { Navbar, createStyles, getStylesRef, rem } from "@mantine/core";
import {
  IconFingerprint,
  IconHome2,
  IconLogin,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";


const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const data = [
  { link: "/", label: "Home", icon: IconHome2 },
  { link: "/about", label: "About Us", icon: IconHome2 },
  { link: "/alumni", label: "alumni", icon: IconFingerprint },
  { link: "/login", label: "Login", icon: IconLogin },
  { link: "/signup", label: "Signup", icon: IconUserCircle },
  { link: "", label: "Log out", icon: IconLogout },
];

export function SideNavBar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");
  const userId = Cookies.get("userId");
  console.log("🚀 ~ file: SideNavBar.tsx:97 ~ SideNavBar ~ userId:", userId);
  const router = useRouter();

  // Function to clear the userId cookie
  const handleLogout = () => {
    Cookies.remove("userId"); // Remove the "userId" cookie
    router.push("/");
  };

  const links = data.map((item) => {
    // Check if there is no userId and the item is not "Log out"
    if (userId === undefined && item.label !== "Log out") {
      return (
        <React.Fragment key={item.label}>
          <Link
            className={cx(classes.link, {
              [classes.linkActive]: item.label === active,
            })}
            href={item.link}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </Link>
        </React.Fragment>
      );
    } else if (userId) {
      // If there is a userId, show all items
      return (
        <React.Fragment key={item.label}>
          <Link
            className={cx(classes.link, {
              [classes.linkActive]: item.label === active,
            })}
            href={item.link}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </Link>
        </React.Fragment>
      );
    } else if (item.label === "Log out") {
      // If there is no userId and the item is "Log out", show it and attach the logout function
      return (
        <React.Fragment key={item.label}>
          <a
            className={cx(classes.link, {
              [classes.linkActive]: item.label === active,
            })}
            href={item.link}
            onClick={handleLogout} // Call the handleLogout function when clicked
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </a>
        </React.Fragment>
      );
    }
    return null; // Hide the item if it's not "Log out" and there is no userId
  });

  return (
    <Navbar height={1000} width={{ sm: 400 }} p="md">
      <Navbar.Section grow>{links}</Navbar.Section>
      <div className="bg-black w-screen  z-20 left-0 right-0 top-0"></div>
    </Navbar>
  );
}
