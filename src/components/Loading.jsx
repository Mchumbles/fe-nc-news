import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Loading() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          aria-hidden="true"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="visually-hidden">Loading content, please wait...</p>
      </div>
    </div>
  );
}
