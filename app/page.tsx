"use client";

import { useId, useState } from "react";
import CustomSelect from "./components/CustomSelect";
import { iDataOption, iSetting } from "./components/CustomSelect/CustomSelect.type";

export interface iDataSubmit {
    name: string;
    address: string;
    position: Array<iDataOption>;
}

export default function Home() {
    const [selectData, setSelectData] = useState<Array<iDataOption>>([]);

    const data: iDataOption[] = [
        {
            label: "Web Developer",
            value: 1,
        },
        {
            label: "Frontend Developer",
            value: 2,
        },
        {
            label: "Backend Developer",
            value: 3,
        },
        {
            label: "Mobile Developer",
            value: 4,
        },
        {
            label: "Fullstack Developer",
            value: 5,
        },
    ];

    const id_input_name = useId(),
        id_input_address = useId(),
        id_input_position = useId();

    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [dataSubmit, setDataDataSubmit] = useState<iDataSubmit[]>([]);

    const handleSubmit = () => {
        setDataDataSubmit([...dataSubmit, { name, address, position: selectData }]);
        setName("");
        setAddress("");
        setSelectData([]);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen p-10 bg-slate-50">
            <h1 className="text-xl text-slate-600 mb-2 text-left w-1/2 font-sans uppercase font-extrabold">Sample Form</h1>
            <form className="flex flex-col gap-2 border rounded-sm border-slate-200 w-1/2 h-ful p-5 bg-white">
                <div className="form-group">
                    <label htmlFor={id_input_name} className="form-label">
                        Name
                    </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} id={id_input_name} type="text" placeholder="Enter Your Name" />
                </div>

                <CustomSelect
                    id={id_input_position}
                    data={data}
                    isMultiple={true}
                    isSearch={true}
                    zIndex={999}
                    value={selectData}
                    onSelect={(data: iDataOption[]) => setSelectData(data)}
                    label="Position"
                    position="row"
                    placeholder="Select Your Position"
                />
                <div className="form-group">
                    <label htmlFor={id_input_address} className="form-label">
                        Address
                    </label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        id={id_input_address}
                        rows={5}
                        placeholder="Enter Your Address"
                    />
                </div>

                <div className="flex gap-2 justify-end items-start">
                    <button
                        className="self-end bg-blue-500 text-white text-sm rounded-md border border-blue-800 active:border-b-0 w-32 h-10 mt-5"
                        type="button"
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </button>
                </div>
            </form>

            {dataSubmit.length > 0 && (
                <div className="fixed top-12 right-10 w-80 h-auto border-l pl-4 bg-white">
                    <h1 className="text-lg text-slate-600 mb-2 text-left w-1/2 font-sans uppercase font-extrabold">Data Submited</h1>
                    <div className="h-auto max-h-[calc(100vh-150px)] overflow-y-auto">
                        {dataSubmit.map((obj, index) => (
                            <div
                                className={`mb-2 pb-2 text-sm text-slate-500 ${
                                    dataSubmit.length > 1 && index !== dataSubmit.length - 1 && "border-b"
                                }`}
                                key={index}
                            >
                                <span className="block">
                                    <b>Name : </b> {obj.name}
                                </span>
                                <span className="block">
                                    <b> Address : </b> {obj.address}
                                </span>
                                <span className="block">
                                    <b> Position : </b> {obj.position.map((obj) => obj.label).join(", ")}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
