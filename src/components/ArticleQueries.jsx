export default function ArticleQueries(props) {
  const { setOrder, order, setSortBy, sortBy, topics } = props;

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const radioBtns =
    "flex items-center space-x-6 mb-4 border-blue-500 pb-4 border-b pl-80 pr-80";

  return (
    <section
      className="flex items-center justify-center"
      aria-labelledby="sort-and-order-heading"
    >
      <form aria-labelledby="sort-and-order-heading">
        <h2
          id="sort-and-order-heading"
          className="text-xl mb-4 flex items-center justify-center text-blue-800"
        >
          Sort and Order
        </h2>
        <fieldset
          className="flex items-center justify-center pb-2"
          aria-labelledby="order-heading"
        >
          <legend id="order-heading" className="sr-only">
            Choose Order
          </legend>
          <label
            htmlFor="order-desc"
            className="flex items-center space-x-2 pr-5"
          >
            <span>High to Low:</span>
            <input
              className="filter-input"
              type="radio"
              id="order-desc"
              name="order"
              value="desc"
              checked={order === "desc"}
              onChange={handleOrderChange}
              aria-checked={order === "desc" ? "true" : "false"}
            />
          </label>
          <label htmlFor="order-asc" className="flex items-center space-x-2">
            <span>Low to High:</span>
            <input
              className="filter-input"
              type="radio"
              id="order-asc"
              name="order"
              value="asc"
              checked={order === "asc"}
              onChange={handleOrderChange}
              aria-checked={order === "asc" ? "true" : "false"}
            />
          </label>
        </fieldset>
        <fieldset className={radioBtns} aria-labelledby="sort-by-heading">
          <legend id="sort-by-heading" className="sr-only">
            Choose Sorting Option
          </legend>

          <label htmlFor="sort-by-date" className="flex items-center space-x-1">
            <span>Date Posted:</span>
            <input
              className="filter-input"
              type="radio"
              id="sort-by-date"
              name="sort-by"
              value="created_at"
              checked={sortBy === "created_at"}
              onChange={handleSortByChange}
              aria-checked={sortBy === "created_at" ? "true" : "false"}
            />
          </label>
          <label
            htmlFor="sort-by-title"
            className="flex items-center space-x-2"
          >
            <span>Title:</span>
            <input
              className="filter-input"
              type="radio"
              id="sort-by-title"
              name="sort-by"
              value="title"
              checked={sortBy === "title"}
              onChange={handleSortByChange}
              aria-checked={sortBy === "title" ? "true" : "false"}
            />
          </label>
          <label
            htmlFor="sort-by-votes"
            className="flex items-center space-x-2"
          >
            <span>Votes:</span>
            <input
              className="filter-input"
              type="radio"
              id="sort-by-votes"
              name="sort-by"
              value="votes"
              checked={sortBy === "votes"}
              onChange={handleSortByChange}
              aria-checked={sortBy === "votes" ? "true" : "false"}
            />
          </label>
          <label
            htmlFor="sort-by-author"
            className="flex items-center space-x-2"
          >
            <span>Author:</span>
            <input
              className="filter-input"
              type="radio"
              id="sort-by-author"
              name="sort-by"
              value="author"
              checked={sortBy === "author"}
              onChange={handleSortByChange}
              aria-checked={sortBy === "author" ? "true" : "false"}
            />
          </label>
          {!topics && (
            <label
              htmlFor="sort-by-topic"
              className="flex items-center space-x-2"
            >
              <span>Topic:</span>
              <input
                className="filter-input"
                type="radio"
                id="sort-by-topic"
                name="sort-by"
                value="topic"
                checked={sortBy === "topic"}
                onChange={handleSortByChange}
                aria-checked={sortBy === "topic" ? "true" : "false"}
              />
            </label>
          )}
        </fieldset>
      </form>
    </section>
  );
}
