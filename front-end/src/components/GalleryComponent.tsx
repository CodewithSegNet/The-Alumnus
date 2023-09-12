import { Card, CardBody, Image, useDisclosure } from "@nextui-org/react";
import ModalComponent from "./Modal";
const GalleryComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const list = [
    {
      title: "Orange",
      img: "https://images.unsplash.com/photo-1562585195-97aff4b3848c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
      title: "Tangerine",
      img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1949&q=80",
    },
    {
      title: "Raspberry",
      img: "https://images.unsplash.com/photo-1562585195-97aff4b3848c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://images.unsplash.com/photo-1562585195-97aff4b3848c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://images.unsplash.com/photo-1562585195-97aff4b3848c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://images.unsplash.com/photo-1562585195-97aff4b3848c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "https://images.unsplash.com/photo-1562585195-97aff4b3848c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "https://images.unsplash.com/photo-1562585195-97aff4b3848c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      price: "$12.20",
    },
  ];

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div className="px-[100px]">
      <h3 className="text-3xl text-center mb-8">About The Alumnus</h3>
      <div className="gap-2 grid grid-cols-4 sm:grid-cols-4">
        {list.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => handleOpen()}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="md"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[250px]"
                src={item.img}
              />
            </CardBody>
            <ModalComponent
              isOpen={isOpen}
              onClose={onClose}
              item={item}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryComponent;
