import { AboutHeader } from "@/components/About/AboutHeader";
import BaseLayout from "@/components/BaseLayout";

const About = () => {
  return (
    <BaseLayout>
      <section className="mt-16">
        <AboutHeader />
      </section>
    </BaseLayout>
  );
};

export default About;
