import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
export default function List() {
  const [todos, setTodos] = useState([]);
  const [computedTodos, setComputedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAllTodos, setIsAllTodos] = useState(true);
  const [perPage, setPerPage] = useState(5);
  const [currPage, setCurrPage] = useState(1);

  const searchHandler = (e) => {
    const query = e.target.value;

    if (query.length > 2) {
      setComputedTodos(
        computedTodos.filter((item) => {
          return item.title.includes(query);
        })
      );
    } else {
      if (isAllTodos) {
        setComputedTodos(
          todos.filter((item) => {
            return item.category === "پیش فرض";
          })
        );
      } else {
        setComputedTodos(
          todos.filter((item) => {
            return item.category !== "پیش فرض";
          })
        );
      }
    }
  };

  const categoryHandler = (param) => {
    if (param) {
      setComputedTodos(
        todos.filter((item) => {
          return item.category === "پیش فرض";
        })
      );
    } else {
      setComputedTodos(
        todos.filter((item) => {
          return item.category !== "پیش فرض";
        })
      );
    }
    setIsAllTodos(param);
  };

  const getTodos = async () => {
    //Calling the mocked api that created in server.js
    const response = await fetch("/api/todos");
    const data = await response.json();

    setTodos(data.todos);
    setComputedTodos(
      data.todos.filter((item) => {
        return item.category === "پیش فرض";
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const selectHandler = (e) => {
    setPerPage(e.target.value);
    setCurrPage(1);
  };

  //Pagination system is here
  const indexOfLastPage = currPage * perPage;
  const indexOfFirstPage = indexOfLastPage - perPage;
  const currentPages = computedTodos.slice(indexOfFirstPage, indexOfLastPage);
  const nPages = Math.ceil(computedTodos.length / perPage);
  let params;

  const currentTodos = computedTodos.slice(indexOfFirstPage, indexOfLastPage);

  if (
    computedTodos.length % perPage !== 0 &&
    currentTodos.length % perPage !== 0
  ) {
    params = indexOfLastPage - perPage + (currentTodos.length % perPage);
  } else {
    params = false;
  }

  const prevPage = () => {
    if (currPage !== 1) setCurrPage(currPage - 1);
  };

  const nextPage = () => {
    if (currPage !== nPages) setCurrPage(currPage + 1);
  };

  return (
    <section className="section">
      <h1>لیست</h1>
      <div className="container">
        <div className={styles["categories"]}>
          <div
            onClick={() => categoryHandler(true)}
            className={
              isAllTodos
                ? `${styles["category"]} ${styles["active"]}`
                : styles["category"]
            }
          >
            پیش فرض
          </div>
          <div
            onClick={() => categoryHandler(false)}
            className={
              !isAllTodos
                ? `${styles["category"]} ${styles["active"]}`
                : styles["category"]
            }
          >
            دسته بندی
          </div>
        </div>
        <div className={styles["search"]}>
          <input
            placeholder="جستجو"
            className={styles["search-input"]}
            type="text"
            onChange={(e) => searchHandler(e)}
          />
          <img
            className={styles["search-icon"]}
            src="/images/Search.png"
            alt=""
          />
        </div>
        <div className={styles["list"]}>
          <ul className={styles["ul"]}>
            {!isLoading ? (
              currentTodos.length > 0 ? (
                currentTodos.map((item, index) => (
                  <li key={index}>
                    <div className={styles["checkmark-container"]}>
                      <input type="checkbox" />
                      <span className={styles["checkmark"]}></span>
                    </div>
                    <div className={styles["detail"]}>
                      {item.title ? item.title : "-"}
                    </div>
                    <div className={styles["detail"]}>
                      {item.discription ? item.discription : "-"}
                    </div>
                    <div className={styles["detail"]}>
                      {item.date ? item.date : "-"}
                    </div>
                  </li>
                ))
              ) : (
                <div className={styles["empty-state"]}>
                  آیتمی برای نمایش وجود ندارد .{" "}
                </div>
              )
            ) : (
              <div className={styles["loading"]}></div>
            )}
          </ul>
        </div>
        <div className={styles["pagination"]}>
          <div className={styles["pages"]}>
            <div className={styles["pages-data"]}> Rows Per Page :</div>
            <select onChange={(e) => selectHandler(e)} name="" id="">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div className={styles["total"]}>
            {computedTodos.length === 0
              ? "0-0 Of 0"
              : `${indexOfFirstPage}-${params ? params : indexOfLastPage} Of ${
                  computedTodos.length
                }`}
          </div>
          <div className={styles["pagination-switch"]}>
            <img src="/images/arrow.png" alt="" onClick={nextPage} />
            <img src="/images/arrow.png" alt="" onClick={prevPage} />
          </div>
        </div>
      </div>
    </section>
  );
}
