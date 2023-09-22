import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

type Props = {
  title: string;
  color: string;
};

const AlertComponent = ({title,color}:Props) => {
  const icon = <IconInfoCircle />;
  return (
    <Alert
      variant="light"
      style={{
        marginBottom: "10px",
      }}
      color={color}
      withCloseButton
      title={title}
      icon={icon}
    >
      {/* {message} */}
    </Alert>
  );
};

export default AlertComponent;
