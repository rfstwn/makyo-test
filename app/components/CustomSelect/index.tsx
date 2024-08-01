"use client";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { iDataOption, iOption, iPropsCustomSelect } from "./CustomSelect.type";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const CustomSelect = (props: iPropsCustomSelect) => {
    // Initialize state for data and option display
    const [dataDisplay, setDataDisplay] = useState<Array<iOption>>(props.data.map((obj) => ({ ...obj, label_display: obj.label })));
    const [openOption, setOpenOption] = useState<boolean>(false);

    // Handle Close Option when click outside
    const wrapperRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);
    const handleClickOutside = (event: any) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setOpenOption(false);
        }
    };

    // Handle for search
    const [searchKey, setSearchKey] = useState<string>("");
    useEffect(() => {
        let arrayTemp: Array<iOption> = [];
        dataDisplay.forEach((item) => {
            arrayTemp.push({
                ...item,
                label_display:
                    searchKey != ""
                        ? item.label.replace(new RegExp("(" + searchKey + ")(?!([^<]+)?>)", "gi"), "<span class='hilight'>$1</span>")
                        : item.label,
            });
        });

        setDataDisplay(arrayTemp);
    }, [searchKey]);

    // Handle Select or Deselect Option
    function onSelect(item: iDataOption) {
        const dataTemp = [...props.value];
        const index = dataTemp.findIndex((findItem) => findItem.value == item.value);

        if (index == -1) {
            if ((!props.setting.multiple && props.value.length === 0) || props.setting.multiple) dataTemp.push(item);
        } else {
            dataTemp.splice(index, 1);
        }

        props.onSelect(dataTemp);
    }

    return (
        <div className={`custom-combobox ${props.position == "column" ? "flex-col" : "flex-row"}`} style={{ zIndex: props.setting.zIndex }}>
            <label htmlFor={props.id} className="custom-combobox__label">
                {props.label}
            </label>

            <div id={props.id} ref={wrapperRef} className="custom-combobox__content">
                <div className="custom-combobox__content__input" onClick={() => setOpenOption(true)}>
                    <div className="custom-combobox__content__input__wrapper">
                        {props.value.length > 0 ? (
                            props.value.map((item, index) => (
                                <div className="custom-combobox__content__input__item" key={index}>
                                    {item.label}
                                    <button type="button" onClick={() => onSelect(item)}>
                                        <IoCloseCircleOutline />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <span className="placeholder">{props.placeholder}</span>
                        )}
                    </div>
                    <IoIosArrowDown className="custom-combobox__content__input__icon" />
                </div>

                <div className={`custom-combobox__content__option ${openOption ? "flex" : "hidden"}`}>
                    {props.setting.search && (
                        <div className="custom-combobox__content__option__search">
                            <CiSearch />
                            <input className="border" type="text" onChange={(e) => setSearchKey(e.target.value)} value={searchKey} />
                            {searchKey != "" && <IoCloseCircleOutline className="cursor-pointer" onClick={() => setSearchKey("")} />}
                        </div>
                    )}
                    <div className="custom-combobox__content__option__list">
                        {dataDisplay.map((item, index) => (
                            <div
                                className={`custom-combobox__content__option__list__item ${
                                    props.value.find((findItem) => findItem.value == item.value) &&
                                    "custom-combobox__content__option__list__item-selected"
                                }`}
                                key={index}
                                onClick={() => onSelect(item)}
                            >
                                <span className="post__content" dangerouslySetInnerHTML={{ __html: item.label_display }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomSelect;
