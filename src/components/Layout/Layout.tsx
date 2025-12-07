import { Suspense } from "react";
import Header from "@components/Header/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "@components/Loading/Loading";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Layout;
