import "../styles/notificationBox.css";

const Notification = ({ errorMessage }) => {
  return (
    <>
      {errorMessage ? <p className="error-message-box">{errorMessage}</p> : ""}
    </>
  );
};

export default Notification;
