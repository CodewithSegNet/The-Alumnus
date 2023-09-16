import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
const AboutComponent = () => {
  const router = useRouter();
  return (
    <div className=" lg:mx-[100px] mx-[20px] text-white text-center py-28">
      <h3 className="text-3xl">About The Alumnus</h3>
      <p className="py-2 lg:w-1/2 px-5 mx-auto text-lg">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
        eveniet ipsam id. Laboriosam labore nisi corporis, esse id officiis
        fugiat blanditiis perspiciatis, accusamus error nihil harum fugit,
        eveniet sapiente quas? Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Dolorem eveniet ipsam id. Laboriosam labore nisi
        corporis, esse id officiis fugiat blanditiis perspiciatis, accusamus
        error nihil harum fugit, eveniet sapiente quas?
      </p>
      <Button
        radius="full"
        onClick={() => {
          router.push({ pathname: "/about" });
        }}
        className="bg-gradient-to-tr from-pink-500 to-blue-500 text-white shadow-lg px-10 py-2 text-lg"
      >
        Read More
      </Button>
    </div>
  );
};

export default AboutComponent;
