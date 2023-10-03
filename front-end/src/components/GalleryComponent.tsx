import {
  Button,
  Card,
  CardBody,
  Image,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import ModalComponent from "./Modal";
const GalleryComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState("");
  const [imgId, setImgId] = React.useState<any>(null);

  const list = [
    {
      id: 1,
      title: "Orange",
      img: "https://plus.unsplash.com/premium_photo-1663089053386-5f8ffc503ea4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 2,
      title: "Tangerine",
      img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1949&q=80",
    },
    {
      id: 3,
      title: "Raspberry",
      img: "https://images.unsplash.com/photo-1562585195-97aff4b3848c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 4,
      title: "Lemon",
      img: "https://images.unsplash.com/photo-1692776778316-2305f48d879f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 5,
      title: "Avocado",
      img: "https://plus.unsplash.com/premium_photo-1682284353484-4e16001c58eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 6,
      title: "Lemon 2",
      img: "https://plus.unsplash.com/premium_photo-1671069848075-c9faefe4df18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
    },
    {
      id: 7,
      title: "Banana",
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1864&q=80",
    },
    {
      id: 8,
      title: "Watermelon",
      img: "https://plus.unsplash.com/premium_photo-1682974403236-5c3f97d854d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    },
  ];

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div className="">
      <h3 className="text-3xl text-center mb-8">Gallery Section</h3>
      <div className="gap-2 grid grid-cols-2 lg:grid-cols-4 lg:px-[100px] px-[20px]">
        {list.map((item) => (
          <Card
            shadow="sm"
            key={item.id}
            isPressable
            onPress={() => {
              handleOpen();
              setImgId(item.id);
            }}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="md"
                width="100%"
                isZoomed
                alt={item.title}
                className="w-full object-cover h-[250px]"
                src={item.img}
              />
            </CardBody>
            {item.id === imgId ? (
              <ModalComponent
                isOpen={isOpen}
                onClose={onClose}
                item={item.img}
              />
            ) : null}
          </Card>
        ))}
      </div>
      <div className="primaryColor py-10 mt-10">
        <div className="  text-white lg:w-[50%] px-[20px] mx-auto">
          <h1 className="text-3xl text-center capitalize">
            subscribe to our weekly/monthly newsletter
          </h1>
          <div className="flex w-full  md:flex-nowrap mb-6 gap-4 mt-10">
            <Input
              radius="none"
              size="sm"
              value={value}
              className="border-white"
              type="email Address"
              onChange={(e) => setValue(e.target.value)}
              variant="bordered"
              label="Email"
            />
            <Button
              onClick={() => console.log(value)}
              size="md"
              className="bg-white text-primary rounded-none py-6 px-8"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryComponent;
