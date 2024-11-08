export default function ArticleQueries(props) {
  const { setOrder, order, setSortBy, sortBy, topics } = props;

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <section>
      <form>
        <div className="filter-desc-asc">
          <p>Sort and Order</p>
          <label htmlFor="order-desc">Descending:</label>
          <input
            className="filter-input"
            type="radio"
            id="order-desc"
            value="desc"
            checked={order === "desc"}
            onChange={handleOrderChange}
          />
          <label htmlFor="order-asc">Ascending:</label>
          <input
            className="filter-input"
            type="radio"
            id="order-asc"
            value="asc"
            checked={order === "asc"}
            onChange={handleOrderChange}
          />
        </div>
        <div className="filter-sort-by">
          <label htmlFor="sort-by-date">Date Posted:</label>
          <input
            className="filter-input"
            type="radio"
            id="sort-by-date"
            value="created_at"
            checked={sortBy === "created_at"}
            onChange={handleSortByChange}
          />
          <label htmlFor="sort-by-title">Title:</label>
          <input
            className="filter-input"
            type="radio"
            id="sort-by-title"
            value="title"
            checked={sortBy === "title"}
            onChange={handleSortByChange}
          />
          <label htmlFor="sort-by-votes">Votes:</label>
          <input
            className="filter-input"
            type="radio"
            id="sort-by-votes"
            value="votes"
            checked={sortBy === "votes"}
            onChange={handleSortByChange}
          />
          <label htmlFor="sort-by-author">Author:</label>
          <input
            className="filter-input"
            type="radio"
            id="sort-by-author"
            value="author"
            checked={sortBy === "author"}
            onChange={handleSortByChange}
          />
          {!topics ? (
            <>
              {" "}
              <label htmlFor="sort-by-topic">Topic:</label>
              <input
                className="filter-input"
                type="radio"
                id="sort-by-topic"
                value="topic"
                checked={sortBy === "topic"}
                onChange={handleSortByChange}
              />{" "}
            </>
          ) : null}
        </div>
      </form>
    </section>
  );
}
