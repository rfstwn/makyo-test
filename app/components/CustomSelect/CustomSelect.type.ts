export interface iDataOption {
    label: string;
    value: string | number;
}

export interface iOption extends iDataOption {
    label_display: string;
}

export interface iPropsCustomSelect {
    id: string;
    value: Array<iDataOption> | [];
    data: Array<iDataOption>;
    onSelect: Function;
    label: string;
    placeholder?: string;
    isSearch?: boolean;
    isMultiple?: boolean;
    zIndex?: number;
    position?: "row" | "column";
}
