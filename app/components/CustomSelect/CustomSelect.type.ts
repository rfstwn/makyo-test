export interface iDataOption {
    label: string;
    value: string | number;
}

export interface iOption extends iDataOption {
    label_display: string;
}

export interface iSetting {
    search: boolean;
    multiple: boolean;
    zIndex: number;
}

export interface iPropsCustomSelect {
    id: string;
    value: Array<iDataOption> | [];
    data: Array<iDataOption>;
    setting: iSetting;
    onSelect: Function;
    label: string;
    placeholder: string;
    position: "row" | "column";
}
