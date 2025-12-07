import { useNavigate } from "react-router-dom";
import { Button } from "@components/Button";
import "./NotFound.scss";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <main className="not-found-page">
      <section className="not-found-page__container">
        <div className="not-found-page__content">
          <h1 className="not-found-page__title">404</h1>
          <h2 className="not-found-page__subtitle">Page Not Found</h2>
          <p className="not-found-page__message">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button.Contained onClick={handleGoHome}>
            Go Back Home
          </Button.Contained>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
