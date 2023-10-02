import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
const AboutComponent = () => {
  const router = useRouter();
  return (
    <div className=" lg:mx-[100px] mx-[20px] text-white text-center py-28">
      <h3 className="text-3xl">About The Alumnus</h3>
      <p className="py-2 lg:w-1/2 px-5 mx-auto text-lg">
        We believe that friendships can stand the test of time, life-changing
        experiences while you were with us, or the opportunity to engage with
        people and places around. The experience is an enduring one that
        continues long after your time with Us, and alumni across the globe help
        us celebrate the relationship they have with us. The alumni Executive
        will be here to ensure enhanced connectivity with and between the alumni
        community while maintaining a global family.
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
