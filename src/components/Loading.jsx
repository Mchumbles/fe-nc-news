import Spinner from "react-bootstrap/Spinner";
// import "bootstrap/dist/css/bootstrap.min.css";
// Look into css clash later. Spinner works with above import, but messes up rest of styling

export default function Loading() {
  return (
    <p>Loading...</p>
    // <Spinner animation="border" role="status">
    //   <span className="visually-hidden">Loading...</span>
    // </Spinner>
  );
}
