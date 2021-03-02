import { FC, useState } from "react"
import { DataRowItem } from "../types"
import { DataRowItem as DataRowItemComponent} from "./DataRowItem"


type DataRowCollectionProps = {
    items: DataRowItem[],
    currency: string,
    setSelectedItem: (item: DataRowItem & {changed: boolean}) => void
    
}

export const DataRowCollection : FC<DataRowCollectionProps> = ({items, currency, setSelectedItem}) => {
    const selectRowItem = (item: DataRowItem & {changed: boolean}) => {
        item.changed = false;
        setSelectedItem(item);
    }

    return <div className="dataRowCollection">
        <div>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Datum</th>
                <th>Částka</th>
                <th>Popis</th>
                <th>Forma</th>
            </tr>
            </thead>

            <tbody>
                {items.map(item=><DataRowItemComponent selectRowItem={selectRowItem} currency={currency} key={item.id} {...item}/>).reverse()}
            </tbody>
        </table>
        </div>
    </div>
    
}