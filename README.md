# Project Test Company

## Project Information

**Company Name** : Makyo Co

**Project Url** : [https://custom-select-example.vercel.app](https://custom-select-example.vercel.app/)

**Storybook Url** : [https://custom-select-storybook.vercel.app](https://custom-select-storybook.vercel.app/)

**Credential for dummy login** : None

## How to use Component [Custom Select]

-   Import component from folder `components`
    ```
        import CustomSelect from "@/app/components/CustomSelect";
    ```
-   Create state with default value is Array, for example
    ```
        const [selectData, setSelectData] = useState([]);
    ```
-   Use component with props
    ```
        <CustomSelect {...props} />
    ```
-   List props of components
    | Props Name | Require | value |
    | :--- | :--- | :--- |
    | **id** | Yes | string |
    | **label** | Yes | string |
    | **isMultiple** | No | boolean, default `true` |
    | **isSearch** | No | boolean, default `true` |
    | **data** | Yes | Array of Object, example [{ label: `string`, value: `number` or `string` }] |
    | **position** | No | `raw` or `column` |
    | **zIndex** | No | number, default `999` |
    | **placeholder** | No | string |
    | **value** | Yes | previously initialized state example `selectData` |
    | **onSelect** | Yes | callback function for set state `selectData` |
