import { FC, useEffect, useState } from "react";
import { DataRowItem } from "../types";

type DataSummaryComponentProps {
    data: DataRowItem[]
}

export const DataSummaryComponent : FC<DataSummaryComponentProps> = ({data}) => {
    const [totalSum, setTotalSum] = useState(0);
    
    const refreshTotalSum = () => {
        let a = 0;
        data.map(x=>a+=x.value);
        setTotalSum(a);
    }

    

    return <>
        <h1>{totalSum}</h1>
    </>
}