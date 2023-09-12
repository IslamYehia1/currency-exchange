"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import S from "./dropdown.module.scss";
import { UpArrow, DownArrow } from "@/components/Icons";
import Loader from "@/components/Loader";

type propsT = {
  title: string;
  list: null | string[];
  onSelect: (index: number) => void;
  selected: null | number;
  disabled: null | number;
  className?: string;
  headerClass?: string;
};

function useOutsideClick(
  ref: RefObject<HTMLInputElement>,
  onClick: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
function Dropdown({
  title,
  list,
  onSelect,
  selected,
  disabled,
  className,
  headerClass,
}: propsT) {
  const [isListOpen, setIsListOpen] = useState(false);
  const wrapperRef = useRef(null);
  const header: string = (list && selected !==null && list[selected]) || title || "";
  useOutsideClick(wrapperRef, () => setIsListOpen(false));

  const handleSelect = (index: number) => {
    onSelect(index);
    setIsListOpen(false);
  };

  function toggleList() {
    setIsListOpen((s) => !s);
  }

  return (
    <div ref={wrapperRef} className={`${S.wrapper} ${className}`}>
      <button
        type="button"
        className={`${S.header} ${headerClass}`}
        onClick={toggleList}
      >
        <span>{header}</span>
        <span className={S.caret}>
          {isListOpen ? <DownArrow /> : <UpArrow />}
        </span>
      </button>
      <div className={`${S.listWrapper}  ${isListOpen ? S.active : ""}`}>
        <div role="list" className={S.list}>
          {list ? (
            list.map((item: string, index: number) => (
              <button
                type="button"
                className={S.listItem}
                disabled={disabled == index}
                key={index}
                onClick={() => handleSelect(index)}
              >
                {item}
              </button>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
export default Dropdown;
