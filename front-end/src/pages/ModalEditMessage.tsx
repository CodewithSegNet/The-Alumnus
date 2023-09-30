import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: any;
  buttonAction: () => void;
  isDeleting: boolean;
  onchange: any;
  value: string;
}
export default function ModalEditMessage({
  isOpen,
  onOpen,
  onOpenChange,
  buttonAction,
  isDeleting,
  onchange,
  value,
}: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Message
              </ModalHeader>
              <ModalBody>
                <Textarea
                  isRequired
                  label="Description"
                  name="userDescript"
                  labelPlacement="outside"
                  value={value}
                  minRows={4}
                  onChange={onchange}
                  placeholder="Enter your message"
                  className="w-full"
                />
                {/* <input
                  type="text"
                  name="userDescript"
                  value={value}
                  onChange={onchange}
                  placeholder=""
                /> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="text-white"
                  color="success"
                  onPress={buttonAction}
                >
                  {isDeleting ? "Loading..." : "Edit Message"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
