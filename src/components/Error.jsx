export default function Error({ msg }) {
  const defaultErrorUrl = "/images/cat-error.png";

  return (
    <div
      className="flex items-center justify-center min-h-screen text-center"
      role="alert"
    >
      <div>
        <h1 className="text-3xl font-bold mb-4">Error :(</h1>
        <img
          src={defaultErrorUrl}
          alt="A cat gif showing frustration or confusion, representing an error"
          className="mx-auto mb-4"
        />
        <p>{msg ? msg : "Something went wrong!"}</p>
      </div>
    </div>
  );
}
