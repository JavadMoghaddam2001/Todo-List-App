import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default function Add() {
  //Todo state which is going to be saved.
  const [todo, setTodo] = useState({
    id: 1,
    title: "",
    discription: "",
    date: "",
    category: "پیش فرض",
    text: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const selectRef = useRef();
  const label1 = useRef();
  const label2 = useRef();
  const label3 = useRef();

  //Date Handler and a swith case for selecting month in correct format.
  const handleDate = (value) => {
    let year = value.$y;
    let day = value.$D;
    let codedMonth = value.$d.toString().split(" ")[1];
    let month;
    switch (codedMonth) {
      case "Jan":
        month = "January";
        break;
      case "Feb":
        month = "Febuary";
        break;
      case "Mar":
        month = "March";
        break;
      case "Apr":
        month = "April";
        break;
      case "May":
        month = "May";
        break;
      case "Jun":
        month = "June";
        break;
      case "Jul":
        month = "July";
        break;
      case "Aug":
        month = "August";
        break;
      case "Sep":
        month = "September";
        break;
      case "Oct":
        month = "October";
        break;
      case "Nov":
        month = "November";
        break;
      case "Dec":
        month = "December";
        break;

      default:
        break;
    }

    setTodo({ ...todo, date: `${day} ${month} ${year}` });
  };

  const handleSubmit = async (e) => {
    //Post to the mocked api that created in server.js

    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      setTodo({
        id: 1,
        title: "",
        discription: "",
        date: "",
        category: "پیش فرض",
        text: "",
      });

      setIsLoading(false);
      label1.current.classList.remove(styles["focused"]);
      label2.current.classList.remove(styles["focused"]);
    } catch (error) {
      //Looking for possible Errors!
      console.error("Error:", error);
    }
  };

  // 'focused' class is the animation for transforming labels
  const inputFocus = (n) => {
    n === 1
      ? label1.current.classList.add(styles["focused"])
      : n === 2
      ? label2.current.classList.add(styles["focused"])
      : false;
  };
  const inputBlur = (e, n) => {
    e.target.value === "" &&
      n === 1 &&
      label1.current.classList.remove(styles["focused"]);
    e.target.value === "" &&
      n === 2 &&
      label2.current.classList.remove(styles["focused"]);
  };

  const selectFocus = () => {
    selectRef.current.style.display = "block";
  };
  const selectBlur = () => {
    selectRef.current.style.display = "none";
  };

  return (
    <section className="section">
      <h1>افزودن</h1>

      <div className="container">
        <div className={styles["title"]}>Personal</div>
        <form onSubmit={handleSubmit}>
          <div className={styles["grid"]}>
            <div className={styles["div"]}>
              <label ref={label1}>عنوان</label>
              <input
                value={todo.title}
                type="text"
                onChange={(e) =>
                  setTodo({
                    ...todo,
                    title: e.target.value,
                  })
                }
                onFocus={() => inputFocus(1)}
                onBlur={(e) => inputBlur(e, 1)}
              />
            </div>
            <div className={styles["div"]}>
              <label ref={label2}>توضیح کوتاه</label>
              <input
                value={todo.discription}
                onFocus={() => inputFocus(2)}
                onChange={(e) =>
                  setTodo({
                    ...todo,
                    discription: e.target.value,
                  })
                }
                onBlur={(e) => inputBlur(e, 2)}
                type="text"
              ></input>
            </div>
            <div>
              {/* Datepicker is applied here by using MUI And some styles are added */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(newValue) => handleDate(newValue)}
                  slotProps={{
                    openPickerButton: {
                      color: "primary",
                    },
                    openPickerIcon: {
                      color: "primary",
                    },

                    textField: {
                      fullWidth: true,
                      focused: true,
                      placeholder: "",

                      sx: {
                        backgroundColor: "#ffffff26",
                        "& input": { color: "white" },
                        "& input div": { height: "100%" },
                        borderRadius: "8px",
                        height: "100%",
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className={styles["div"]}>
              <label className={styles["focused"]} ref={label3}>
                دسته بندی
              </label>
              <input
                onFocus={selectFocus}
                onBlur={() => setTimeout(selectBlur, 50)}
                type="text"
                value={todo.category}
              ></input>
              <ul ref={selectRef}>
                <li
                  onClick={(e) =>
                    setTodo({
                      ...todo,
                      category: e.target.textContent,
                    })
                  }
                >
                  پیش فرض
                </li>
                <li
                  onClick={(e) =>
                    setTodo({
                      ...todo,
                      category: e.target.textContent,
                    })
                  }
                >
                  کار
                </li>
                <li
                  onClick={(e) =>
                    setTodo({
                      ...todo,
                      category: e.target.textContent,
                    })
                  }
                >
                  ورزش
                </li>
                <li
                  onClick={(e) =>
                    setTodo({
                      ...todo,
                      category: e.target.textContent,
                    })
                  }
                >
                  دانشگاه
                </li>
              </ul>
              <img src="/images/arrow.png" alt="" />
            </div>
            <div className={styles["div"]}>
              <textarea
                value={todo.text}
                onChange={(e) =>
                  setTodo({
                    ...todo,
                    text: e.target.value,
                  })
                }
                placeholder="شرح"
                type="text"
              ></textarea>
            </div>
          </div>
          <div className={styles["button"]}>
            {isLoading ? (
              <div className={styles["loading"]}></div>
            ) : (
              <button>ذخیره</button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
