"use client";
import AboutComponent from "@/components/AboutComponent";
import { BannerSlider } from "@/components/BannerSection/Banner";
import BaseLayout from "@/components/BaseLayout";
import Executives from "@/components/Executives";
import Faq from "@/components/Faq";
import GalleryComponent from "@/components/GalleryComponent";
import Reviews from "@/components/Reviews";
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
        <section className="mt-[65px] lg:mx-[100px] mx-[20px]">
          <BannerSlider />
        </section>
        <section className="mt-[55px] lg:mx-[100px] mx-[20px]">
          <CardSectionComponent />
        </section>
        <section className="mt-[55px] primaryColor">
          <AboutComponent />
        </section>
        <section className="mt-[55px] ">
          <GalleryComponent />
        </section>
        <section className="mt-[55px] ">
          <Executives />
        </section>
        <section className="mt-[55px] ">
          <Reviews />
        </section>
      </BaseLayout>
    </main>
  );
}
