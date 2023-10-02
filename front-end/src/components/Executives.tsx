import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

const excoData = [
  {
    id: 1,
    name: "Hon. Justice Ogulu benson",
    position: "Board Member",
    img: "https://images.unsplash.com/photo-1692776778316-2305f48d879f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 2,
    name: " Mrs. Abiola Shola",
    position: "President of Schools Alumni Association",
    img: "https://images.unsplash.com/photo-1562585195-97aff4b3848c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: 3,
    name: "Mr. Mbagwu James",
    position: "Vice President of Communications & Schools Relations",
    img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1949&q=80",
  },
  {
    id: 4,
    name: "Mr. Chika job",
    position: "Vice President Events & Functions",
    img: "https://plus.unsplash.com/premium_photo-1682284353484-4e16001c58eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
];
const Executives = () => {
  return (
    <section className="">
      <div className="lg:mx-[100px] mx-[20px] ">
        <div className="text-white text-center py-8">
          <h3 className="text-3xl text-primary capitalize">
            meet the alumni leadership
          </h3>
          <p className="py-2 lg:w-1/2 px-5 mx-auto text-lg text-black">
            The association's leadership consists of highly qualified
            individuals cutting across different industries committed to serving
            the alumni body's needs.
          </p>
        </div>
        {/* excos */}
        <div className="grid  sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {excoData.map((item) => {
            return (
              <Card className="py-4">
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className=" rounded-xl h-[200px] object-cover object-center w-full"
                    src={item.img}
                    height={200}
                    isZoomed
                    width={"100%"}
                  />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large text-[#03045E]">
                    {item.name}
                  </h4>
                  {/* <p className="text-[14px] pr-2">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Explicabo, blanditiis!
                  </p> */}
                  <small className="text-default-800 font-bold">
                    {item.position}
                  </small>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Executives;
