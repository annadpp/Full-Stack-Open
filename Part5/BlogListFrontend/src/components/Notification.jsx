const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const className = message.includes("Wrong" || "Error") ? "error" : "success";

  return <div className={`${className}`}>{message}</div>;
};

export default Notification;
