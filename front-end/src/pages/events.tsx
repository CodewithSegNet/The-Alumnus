import BaseLayout from "@/components/BaseLayout";
import { Image } from "@mantine/core";
import { useDisclosure } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModalDelete from "./Modal";
import { deleteUser } from "./api/deleteUser";
import { getUserData } from "./api/user";

const Events = () => {
  const userId = Cookies.get("userId");
  const { data, isLoading, isError } = useQuery(["user", userId], () =>
    getUserData(userId)
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteUser(userId);
      setIsDeleting(false);
      router.push("/login");

      // Optionally, you can perform actions after successful deletion
      console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting user:", error);
      setIsDeleting(false);
    }
  };

  function logout() {
    // Remove the user-related cookies (e.g., authentication token and user ID)
    Cookies.remove("token");
    Cookies.remove("userId");

    // Optionally, you can perform other logout actions, such as redirecting to the login page
    router.push("/login");
    // Example: window.location.href = "/login";
  }

  useEffect(() => {
    if (!userId) {
      // Redirect the user to the login page
      router.push("/login"); // Replace "/login" with your actual login route
    }
    if (isDeleting === true) {
      router.push("/login"); // Replace "/login" with your actual login route
    }
  }, [router]);

  if (!userId) {
    return (
      <div className="h-screen flex justify-center items-center m-auto">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <BaseLayout>
      <div className=" mt-5">
        <section className="">
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="  lg:flex ">
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Alumni Name
                  </h2>

                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                    {data?.user?.first_name} {data?.user?.last_name}{" "}
                    {data?.user?.username}
                  </h1>
                  <div className="flex mb-4">
                    <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                      Description
                    </a>
                  </div>
                  <p className="leading-relaxed mb-4">
                    Fam locavore kickstarter distillery. Mixtape chillwave
                    tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam
                    inxigo juiceramps cornhole raw denim forage brooklyn.
                    Everyday carry +1 seitan poutine tumeric. Gastropub blue
                    bottle austin listicle pour-over, neutra jean.
                  </p>
                  <div className="flex border-t capitalize border-gray-200 py-2">
                    <span className="text-gray-500">First Name</span>
                    <span className="ml-auto text-gray-900">
                      {data?.user?.first_name}
                    </span>
                  </div>
                  <div className="flex border-t capitalize border-gray-200 py-2">
                    <span className="text-gray-500">Middle Name</span>
                    <span className="ml-auto text-gray-900">
                      {data?.user?.middle_name}
                    </span>
                  </div>
                  <div className="flex border-t capitalize border-gray-200 py-2">
                    <span className="text-gray-500">Last Name</span>
                    <span className="ml-auto text-gray-900">
                      {data?.user?.last_name}
                    </span>
                  </div>
                  <div className="flex border-t capitalize border-gray-200 py-2">
                    <span className="text-gray-500">User Name</span>
                    <span className="ml-auto text-gray-900">
                      {data?.user?.username}
                    </span>
                  </div>
                  <div className="flex border-t capitalize border-gray-200 py-2">
                    <span className="text-gray-500">Graduation year</span>
                    <span className="ml-auto text-gray-900">
                      {data?.user?.grad_year}
                    </span>
                  </div>

                  <div className="flex justify-end gap-x-4 mt-4">
                    <button
                      onClick={() => {
                        onOpen();
                      }}
                      className="  text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded capitalize"
                    >
                      {"Delete"}
                    </button>
                    <button
                      onClick={logout}
                      className="  text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded capitalize"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full rounded-md">
                  <Image
                    alt="ecommerce"
                    height={600}
                    radius={3}
                    className=" lg:h-auto  object-cover object-center rounded "
                    src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
      <ModalDelete
        isOpen={isOpen}
        onOpen={onOpen}
        isDeleting={isDeleting}
        onOpenChange={onOpenChange}
        buttonAction={() => {
          handleDelete();
        }}
      />
    </BaseLayout>
  );
};

export default Events;
