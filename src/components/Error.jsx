export default function Error({ msg }) {
  return (
    <div>
      <h1>{"Error :("}</h1>
      <p>{msg ? msg : ""}</p>
    </div>
  );
}
