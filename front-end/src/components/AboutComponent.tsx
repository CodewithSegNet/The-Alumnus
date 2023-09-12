import { Button } from "@nextui-org/react";
const AboutComponent = () => {
  return (
    <div className=" mx-[100px] text-white text-center py-28">
      <h3 className="text-3xl">About The Alumnus</h3>
      <p className="py-2 w-1/2 mx-auto text-lg">
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
        className="bg-gradient-to-tr from-pink-500 to-blue-500 text-white shadow-lg px-10 py-2 text-lg"
      >
        Read More
      </Button>
    </div>
  );
};

export default AboutComponent;
