import styles from '../styles/styles.module.css'

import Pagination from '@mui/material/Pagination'
import React, { useEffect, useState } from 'react'

import Loading from '../components/Loading'
import axios from 'axios'

const ListUsers = () => {
  const [page, setPage] = useState(1)
  const [result, setResult] = useState(10)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState(0)

  //   const baseURL = `https://randomuser.me/api/?page=3&results=10`
  const baseURL = `https://randomuser.me/api/?page=${page}&results=${result}&sort=${sort}
  `
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await axios.get(baseURL).then((resp) => {
        setData(resp.data.results)
        console.log(resp)
      })

      console.log(data)

      setLoading(false)
    }
    fetchData()
  }, [baseURL])

  const handleChange = (event, value) => {
    setPage(value)
  }

  function exportData(data) {
    return (
      <>
        {data
          .sort(
            sort == 1
              ? (a, b) => {
                  const nameA = a.login.username.toUpperCase() // ignore upper and lowercase
                  const nameB = b.login.username.toUpperCase() // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1
                  }
                  if (nameA > nameB) {
                    return 1
                  }

                  // names must be equal
                  return 0
                }
              : (a, b) => {
                  const nameA = a.login.username.toUpperCase() // ignore upper and lowercase
                  const nameB = b.login.username.toUpperCase() // ignore upper and lowercase
                  if (nameA < nameB) {
                    return 1
                  }
                  if (nameA > nameB) {
                    return -1
                  }

                  // names must be equal
                  return 0
                }
          )
          .map((item) => (
            <tr>
              <td>
                {item.name.title} {item.name.first}
                {item.name.last}
              </td>
              <td>{item.login.username}</td>
              <td>
                <img className={styles.img} src={item.picture.thumbnail} alt='img' />
              </td>
            </tr>
          ))}
      </>
    )
  }
  const handleSort = (e) => {
    console.log(e.target.value)
    setSort(e.target.value)
    setPage(page)
  }
  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.container}>
        <div className={styles.r}>
          <div className={styles.con}>
            <div className={styles.btns}>
              <select className={styles.select} onChange={(e) => handleSort(e)}>
                {/* <option value='0' selected={sort === '0'}>
                  All
                </option> */}
                <option value='1' selected={sort === '1'}>
                  Username Ascending
                </option>
                <option value='-1' selected={sort === '-1'}>
                  Username Descending
                </option>
              </select>
            </div>
            <table className={styles.table}>
              <tr>
                <th className={styles.th}>Full Name</th>
                <th className={styles.th}>Username</th>
                <th className={styles.th}>Thumbnail Icon</th>
              </tr>
              {exportData(data)}
            </table>
            <hr />
            <div>
              <Pagination
                className={styles.Pagination}
                hidden={data.length === 0 ? true : false}
                count={Math.ceil(data.length / 1)}
                page={page}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ListUsers
