export default function ArticleQueries(props) {
  const { setOrder, order, setSortBy, sortBy, topics } = props;

  console.log(topics);

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const radioBtns =
    "flex items-center space-x-6 mb-4 border-blue-500 pb-4 border-b pl-80 pr-80";

  return (
    <section className="flex items-center justify-center">
      <form>
        <p className="text-xl mb-4 flex items-center justify-center text-blue-800">
          Sort and Order
        </p>

        <div className={"flex items-center justify-center pb-2"}>
          <label
            htmlFor="order-desc"
            className="flex items-center space-x-2 pr-5"
          >
            <span>High to Low:</span>
            <input
              className="filter-input"
              type="radio"
              id="order-desc"
              value="desc"
              checked={order === "desc"}
              onChange={handleOrderChange}
            />
          </label>

          <label htmlFor="order-asc" className="flex items-center space-x-2">
            <span>Low to High:</span>
            <input
              className="filter-input"
              type="radio"
              id="order-asc"
              value="asc"
              checked={order === "asc"}
              onChange={handleOrderChange}
            />
          </label>
        </div>

        <div className={radioBtns}>
          <label
            htmlFor="sort-by-date"
            className="flex items-center space-x-1 "
          >
            <span>Date Posted:</span>
            <input
              className="filter-input"
              type="radio"
              id="sort-by-date"
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
              className="filter-input"
              type="radio"
              id="sort-by-title"
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
              className="filter-input"
              type="radio"
              id="sort-by-votes"
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
              className="filter-input"
              type="radio"
              id="sort-by-author"
              value="author"
              checked={sortBy === "author"}
              onChange={handleSortByChange}
            />
          </label>

          {!topics ? (
            <label
              htmlFor="sort-by-topic"
              className="flex items-center space-x-2"
            >
              <span>Topic:</span>
              <input
                className="filter-input"
                type="radio"
                id="sort-by-topic"
                value="topic"
                checked={sortBy === "topic"}
                onChange={handleSortByChange}
              />
            </label>
          ) : null}
        </div>
      </form>
    </section>
  );
}
