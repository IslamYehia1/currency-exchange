"use client";
import { useEffect, useRef, useState } from "react";
import S from "./dropdown.module.scss";
function useOutsideClick(ref, onClick) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        onClick();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
function Dropdown({ title, list, onSelect, selected }: any) {
  const [isListOpen, setIsListOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setIsListOpen(false));
  const header: string = list[selected]?.title || title || "";

  const handleSelect = (item: any) => {
    onSelect(item);
    setIsListOpen(false);
  };
  function toggleList() {
    setIsListOpen((s) => !s);
  }

  return (
    <div ref={wrapperRef} className={S.wrapper}>
      <button type="button" className={S.header} onClick={toggleList}>
        <span className="dd-header-title">{header}</span>
        {isListOpen ? <span>U</span> : <span> D</span>}
      </button>
      {/* {isListOpen && ( */}
      <div role="list" className={S.list}>
        {list?.map((item: any, index: number) => (
          <button
            type="button"
            className={S.listItem}
            key={item.id}
            onClick={() => handleSelect(index)}
          >
            {item.title} {item.selected && <div>U</div>}
          </button>
        ))}
      </div>
      {/* )} */}
    </div>
  );
}
export default Dropdown;
