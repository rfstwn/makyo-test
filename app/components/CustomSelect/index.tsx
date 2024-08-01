"use client";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { iDataOption, iOption, iPropsCustomSelect } from "./CustomSelect.type";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import PropTypes from "prop-types";

const CustomSelect = ({
    id,
    label,
    data,
    value,
    onSelect,
    placeholder,
    isSearch = true,
    isMultiple = true,
    zIndex = 999,
    position = "row",
}: iPropsCustomSelect) => {
    // Initialize state for data and option display
    const [dataDisplay, setDataDisplay] = useState<Array<iOption>>(data.map((obj) => ({ ...obj, label_display: obj.label })));
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
    function onSelectItem(item: iDataOption) {
        const dataTemp = [...value];
        const index = dataTemp.findIndex((findItem) => findItem.value == item.value);

        if (index == -1) {
            if ((!isMultiple && value.length === 0) || isMultiple) dataTemp.push(item);
        } else {
            dataTemp.splice(index, 1);
        }

        onSelect(dataTemp);
    }

    return (
        <div className={`custom-combobox ${position == "column" ? "flex-col" : "flex-row"}`} style={{ zIndex: zIndex }}>
            <label htmlFor={id} className="custom-combobox__label">
                {label}
            </label>

            <div id={id} ref={wrapperRef} className="custom-combobox__content">
                <div className="custom-combobox__content__input" onClick={() => setOpenOption(true)}>
                    <div className="custom-combobox__content__input__wrapper">
                        {value.length > 0 ? (
                            value.map((item, index) => (
                                <div className="custom-combobox__content__input__item" key={index}>
                                    {item.label}
                                    <button type="button" onClick={() => onSelectItem(item)}>
                                        <IoCloseCircleOutline />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <span className="placeholder">{placeholder}</span>
                        )}
                    </div>
                    <IoIosArrowDown className="custom-combobox__content__input__icon" />
                </div>

                <div className={`custom-combobox__content__option ${openOption ? "flex" : "hidden"}`}>
                    {isSearch && (
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
                                    value.find((findItem) => findItem.value == item.value) && "custom-combobox__content__option__list__item-selected"
                                }`}
                                key={index}
                                onClick={() => onSelectItem(item)}
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

CustomSelect.prototypes = {
    id: PropTypes.string,
    isSearch: PropTypes.bool,
    isMultiple: PropTypes.bool,
    zIndex: PropTypes.number,
    label: PropTypes.string,
    data: PropTypes.array,
    value: PropTypes.array,
    onSelect: PropTypes.func,
    placeholder: PropTypes.string,
    position: PropTypes.oneOf(["row", "column"]),
};
