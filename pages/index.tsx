import React, { useState } from 'react'
import {
  ViewerDocument,
} from '../lib/viewer.graphql'
import { initializeApollo } from '../lib/apollo'
import Head from 'next/head'
import { DataRowItem, DataRowItem as DataRowItemType} from '../types'
import { DataRowCollection } from '../components/DataRowCollection'
import styles from '../styles/Home.module.css'
import { Menu } from '../components/menu'
import { TotalSumComponent } from '../components/TotalSumComponent'
import { AddDataRowItem } from '../components/AddDataRowItemComponent'

const items : DataRowItemType[] = [
  {id: 0, date: "2020-01-30", value: -555, description: "párky", form: "běžný účet"},
  {id: 1, date: "2020-03-20", value: -358, description: "rohlíky", form: "hotovost"},
  {id: 2, date: "2020-12-24", value: 85, description: "daně", form: "spořící účet"},
  {id: 3, date: "2020-11-15", value: 4875, description: "podpora v nezaměstnanosti", form: "hotovost"},
]

let sum = 0;
items.forEach(element => {
  sum += element.value;
});

const myCurrency = "Kč";

const Index = () => {
    const [data, setData] = useState(items)
    const [nextId, setNextId] = useState(items.length+1)
    
    const addItem = (item: DataRowItem) => {
      setData([...data, item])
      
    }
    
    const getNewId = () => {
      setNextId(nextId+1);
      return nextId-1;
    }
    
    const [nextUpdate, setNextUpdate] = useState(items.length+1)
    const returnUpdateUtility = () => {
      setNextUpdate(nextUpdate+1);
      return nextUpdate-1;
  }

    const selectRowItem = (item: DataRowItem & {changed: boolean}) => {
      setSelectedRow(item);
  }

  const updateItem = (item: DataRowItem) => {
    const update = data;
    update.forEach(element => {
      if (element.id == item.id) {
        element.date = item.date;
        element.description = item.description;
        element.form = item.form;
        element.value = item.value;
      }
    });
    setData(update);
  }

  const deleteItem = (id: number) => {
    setData(data.filter(element=>element.id !== id));
  }
  
  const [selectedRow, setSelectedRow] = useState({id:0, date:"", value:0, description:"", form:"", changed: false});
  return (
    <div>
      <Head>
        <title>Finance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu></Menu>
      <main>
        <div className={styles.container}>
          <div className={styles.summary}>
            <TotalSumComponent items={data} currency={myCurrency}></TotalSumComponent>
          </div>

          <div className={styles.control}>
            <AddDataRowItem addItem={addItem} getNewId={getNewId} fillFormItem={selectedRow} updateItem={updateItem} returnUpdateUtility={returnUpdateUtility} deleteItem={deleteItem}></AddDataRowItem>
          </div>

          <div className={styles.dataTable}>
            <DataRowCollection currency={myCurrency} items={data} setSelectedItem={selectRowItem}></DataRowCollection>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerDocument,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
