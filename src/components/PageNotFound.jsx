export default function PageNotFound() {
  return (
    <main role="main" aria-labelledby="error-heading">
      <h1
        id="error-heading"
        className="text-3xl font-bold text-center text-red-600"
      >
        Error
      </h1>
      <p role="alert" className="text-xl text-center text-gray-800">
        404 - Page Not Found
      </p>
    </main>
  );
}
