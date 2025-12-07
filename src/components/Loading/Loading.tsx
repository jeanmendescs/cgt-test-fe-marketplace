import "./Loading.scss";

function Loading() {
  return (
    <div className="loading" role="status" aria-label="Loading">
      <div>
        <div className="loading__spinner"></div>
        <p className="loading__text">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
