// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";

import CustomSelect from "@/app/components/CustomSelect";
import { useState } from "react";
import { iDataOption } from "@/app/components/CustomSelect/CustomSelect.type";

const meta: Meta<typeof CustomSelect> = {
    title: "Custom Select",
    component: CustomSelect,
};

export default meta;
type Story = StoryObj<typeof CustomSelect>;

export const Base: Story = {
    args: {
        id: "custom-select",
        data: [
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
            {
                label: "Ui/Ux Designer",
                value: 6,
            },
        ],
        isSearch: true,
        isMultiple: true,
        placeholder: "Select your position",
        label: "Position",
        position: "row",
        zIndex: 999,
    },
    parameters: {
        controls: {
            exclude: ["onSelect", "value"],
        },
    },
    render: (args) => {
        const [value, setValue] = useState<Array<iDataOption>>([]);
        return <CustomSelect {...args} value={value} onSelect={(e: any) => setValue(e)} />;
    },
};
