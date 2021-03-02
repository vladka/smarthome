import { FC } from "react"
import { DataRowItem } from "../types";

type TotalSumComponentProps = {
    currency?: string,
    items: DataRowItem[]
};

export const TotalSumComponent : FC<TotalSumComponentProps> = ({currency, items}) => {
    const returnSum = (items: DataRowItem[]) => {
        let sum = 0;
        items.forEach(element => {
            sum+=element.value; 
        });
        return sum;
    }

    return <>
        Celkový součet: {returnSum(items)} {currency}
    </>
}