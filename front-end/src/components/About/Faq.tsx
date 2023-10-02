import React from "react";

import { Accordion, AccordionItem } from "@nextui-org/react";

export default function FaqComponent() {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set(["1"]));

  const defaultContent =
    "Our Platform fosters connections and facilitates engagement among the alumni community of Lorem School.";

  return (
    <Accordion
      style={{ width: "100%" }}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <AccordionItem
        key="1"
        aria-label="Accordion 1"
        title="What’s The Alumnus:"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Accordion 2"
        title="How do I become a member of The Alumnus:"
      >
        To be a member of The Alumnus you simply sign up on our page.
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="How do I join?">
        To join The Alumnus you simply sign up on our page.
      </AccordionItem>
    </Accordion>
  );
}
