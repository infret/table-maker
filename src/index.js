import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/* Компонент для построения таблицы с дополнительными возможностями для пользователя.
1. Данные необходимо отображать постранично, максимум 50 элементов на страницу
2. Необходимо предоставить пользовательскую навигацию для перехода по страницам
3. При нажатии на название столбца строки таблицы сортируются по возрастанию, при повторном клике - по убыванию
4. Текстовое поле скрывает несовпадающие со своим содержимым поля, перефильтрация осуществляется на каждое изменение значения поля.
*/

const App = () => {
  const [filter, setFilter] = useState('')
  const [currentPage, setPage] = useState(1)

  // prettier-ignore
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
    70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
    80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
     100, 101, 102]

  function getChunks(arr, size) {
    var tempArray = []
    for (let i = 0; i < arr.length; i += size) {
      let chunk = arr.slice(i, i + size)
      tempArray.push(chunk)
    }
    return tempArray
  }

  function handleFilter({ target }) {
    setFilter(target.value)
  }

  return (
    <div style={{ margin: 'auto', width: '600px', height: '500px', fontFamily: 'sans-serif' }}>
      <h2>Табличное представление данных, их пагинация, фильтрация и сортировка без хардкода</h2>
      <form style={{ width: '100%' }}>
        <label htmlFor='filter'>Фильтрация:</label>
        <input
          type='search'
          id='filter'
          value={filter}
          onChange={handleFilter}
          style={{
            margin: '10px',
            padding: '5px',
            borderRadius: '4px',
            border: '2px solid gainsboro'
          }}
        />
      </form>
      {getChunks(data, 50).map(
        (page, index) =>
          currentPage === index + 1 && (
            <Table page={getChunks(page, 10)} filter={filter} key={index} />
          )
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Страницы:</p>
        {getChunks(data, 50).map((page, index) => (
          <button
            onClick={() => setPage(index + 1)}
            style={{
              backgroundColor: 'white',
              width: '50px',
              marginLeft: '10px',
              border:
                index + 1 === currentPage ? '2px solid cornflowerblue' : '2px solid gainsboro',
              padding: '9px 18px',
              borderRadius: '4px'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

const Table = ({ page, filter }) => {
  const [sort, setSort] = useState('asc')

  function handleSort() {
    sort === 'desc' ? setSort('asc') : setSort('desc')
    page = page.reverse()
  }

  return (
    <table border='1' style={{ borderCollapse: 'collapse', border: 'none', margin: '20px 0' }}>
      <thead onClick={handleSort}>
        <tr>
          {page[0].map((td, index) => (
            <th
              scope='col'
              style={{
                fontSize: '18px',
                width: '60px',
                height: '40px',
                padding: '0 9px',
                boxSizing: 'border-box',
                textAlign: 'center',
                border: '2px solid gainsboro'
              }}
            >
              {String.fromCharCode(65 + index).toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {page.map((chunk, index) => (
          <tr key={index}>
            {chunk.map((data, i) => (
              <td
                style={{
                  fontSize: '18px',
                  overflow: 'auto',
                  width: '60px',
                  height: '40px',
                  padding: '0 9px',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  border: '2px solid gainsboro'
                }}
                key={i}
              >
                {filter ? (data.toString().includes(filter) ? data : '') : data}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
