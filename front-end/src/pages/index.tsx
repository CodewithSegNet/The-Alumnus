"use client";
import AboutComponent from "@/components/AboutComponent";
import { BannerSlider } from "@/components/BannerSection/Banner";
import BaseLayout from "@/components/BaseLayout";
import GalleryComponent from "@/components/GalleryComponent";
import CardSectionComponent from "@/components/cardSection";

import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      <Head>
        <title>The Alumnus</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {/* the main page ui starts here */}
      <BaseLayout>
        <section className="mt-[65px] mx-[100px]">
          <BannerSlider />
        </section>
        <section className="mt-[55px] mx-[100px]">
          <CardSectionComponent />
        </section>
        <section className="mt-[55px] bg-primary">
          <AboutComponent />
        </section>
        <section className="mt-[55px] ">
          <GalleryComponent />
        </section>
      </BaseLayout>
    </main>
  );
}
