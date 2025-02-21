export default function ArticleQueries(props) {
  const { setOrder, order, setSortBy, sortBy, topics } = props;

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <section className="flex justify-center px-4">
      <form className="w-full max-w-md">
        <h2 className="text-xl mb-4 text-center text-blue-800">
          Sort and Order
        </h2>

        <fieldset className="flex flex-wrap justify-center gap-4 mb-4">
          <legend className="sr-only">Choose Order</legend>
          <label htmlFor="order-desc" className="flex items-center space-x-2">
            <span>High to Low:</span>
            <input
              type="radio"
              id="order-desc"
              name="order"
              value="desc"
              checked={order === "desc"}
              onChange={handleOrderChange}
            />
          </label>
          <label htmlFor="order-asc" className="flex items-center space-x-2">
            <span>Low to High:</span>
            <input
              type="radio"
              id="order-asc"
              name="order"
              value="asc"
              checked={order === "asc"}
              onChange={handleOrderChange}
            />
          </label>
        </fieldset>

        <fieldset className="flex flex-wrap justify-center gap-4 border-t border-blue-500 pt-4">
          <legend className="sr-only">Choose Sorting Option</legend>

          <label htmlFor="sort-by-date" className="flex items-center space-x-2">
            <span>Date:</span>
            <input
              type="radio"
              id="sort-by-date"
              name="sort-by"
              value="created_at"
              checked={sortBy === "created_at"}
              onChange={handleSortByChange}
            />
          </label>

          <label
            htmlFor="sort-by-title"
            className="flex items-center space-x-2"
          >
            <span>Title:</span>
            <input
              type="radio"
              id="sort-by-title"
              name="sort-by"
              value="title"
              checked={sortBy === "title"}
              onChange={handleSortByChange}
            />
          </label>

          <label
            htmlFor="sort-by-votes"
            className="flex items-center space-x-2"
          >
            <span>Votes:</span>
            <input
              type="radio"
              id="sort-by-votes"
              name="sort-by"
              value="votes"
              checked={sortBy === "votes"}
              onChange={handleSortByChange}
            />
          </label>

          <label
            htmlFor="sort-by-author"
            className="flex items-center space-x-2"
          >
            <span>Author:</span>
            <input
              type="radio"
              id="sort-by-author"
              name="sort-by"
              value="author"
              checked={sortBy === "author"}
              onChange={handleSortByChange}
            />
          </label>

          {!topics && (
            <label
              htmlFor="sort-by-topic"
              className="flex items-center space-x-2"
            >
              <span>Topic:</span>
              <input
                type="radio"
                id="sort-by-topic"
                name="sort-by"
                value="topic"
                checked={sortBy === "topic"}
                onChange={handleSortByChange}
              />
            </label>
          )}
        </fieldset>
      </form>
    </section>
  );
}
