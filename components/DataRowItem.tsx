import { FC } from "react"
import { DataRowItem as DataRowType } from "../types"


type DataRowItemProps = DataRowType & {
    currency: string, 
    selectRowItem: (item:DataRowType & {changed: boolean}) => void; 
};

export const DataRowItem : FC<DataRowItemProps> = ({id, date, value, description, form, currency, selectRowItem}) => {
    const changed = false;
    return <tr onClick={()=>{selectRowItem({id, date, value, description, form, changed})}}>
            <td>{id}</td>
            <td>{date}</td>
            <td>{value} {currency}</td>
            <td>{description}</td>
            <td>{form}</td>
        </tr>

}