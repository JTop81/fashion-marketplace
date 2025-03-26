import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import IndexedDBUtil from "common/util/db";

export const FormikTempPersist = () => {
  const route = useLocation();

  useEffect(() => {
    if (route.pathname === "/post/create") return;

    IndexedDBUtil.clearData();
  }, [route.pathname]);

  return <></>;
};
