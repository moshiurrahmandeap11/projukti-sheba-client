import { Suspense } from "react";
import Loader from "../../comopnents/sharedItems/Loader/Loader";

// HOC pattern
export const Loadable = (Component) => {
  return function WrappedComponent(props) {
    return (
      <Suspense fallback={<Loader></Loader>}>
        <Component {...props} />
      </Suspense>
    );
  };
};
