//Header Component
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
export default function Header() {
  const [page, setPage] = useState(1);

  const pageRoute = (n) => {
    setPage(n);
  };

  useEffect(() => {
    if (window.location.href.includes("addtodo")) {
      setPage(2);
    } else {
      setPage(1);
    }
  }, []);

  return (
    //navigation part
    <header>
      <nav>
        <Link
          onClick={() => pageRoute(1)}
          className={page === 1 ? styles["active"] : ""}
          to="/"
        >
          لیست کارها
        </Link>
        <Link
          onClick={() => pageRoute(2)}
          className={page === 2 ? styles["active"] : ""}
          to="/addtodo"
        >
          افزودن کار
        </Link>
      </nav>
    </header>
  );
}
