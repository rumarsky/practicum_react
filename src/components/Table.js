// Компонент для отображения таблицы с пагинацией и фильтрацией
// Использует TableHead, TableBody и Filter для организации данных

import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from 'react';

const Table = (props) => {
  // Состояние для текущей активной страницы пагинации
  const [activePage, setActivePage] = useState(1);
  
  // Обработчик изменения активной страницы
  const changeActive = (event) => {
    setActivePage(Number(event.target.innerHTML));
  };

  // Состояние для данных таблицы (может изменяться при фильтрации)
  const [dataTable, setDataTable] = useState(props.data);
  
  // Обновляет данные таблицы после фильтрации и сбрасывает пагинацию на первую страницу
  const updateDataTable = (value) => {
    setDataTable(value);
    setActivePage(1);

    props.onFilter(value);
  };

  console.log(props.showPagination);

  // Определяет, нужно ли показывать пагинацию
  const showPagination = props.showPagination !== false;
  
  // Количество строк для отображения
  const rowsToShow = showPagination ? props.amountRows : dataTable.length;

  // Рассчитывает количество страниц для пагинации
  const n = Math.ceil(dataTable.length / rowsToShow);
  
  // Создаёт массив номеров страниц для пагинации
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  
  // Генерирует элементы пагинации
  const pages = arr.map((item, index) => (
    <span
      key={index}
      className={`page-number ${activePage === item ? 'active' : ''}`}
      onClick={changeActive}
    >
      {item}
    </span>
    
  ));

  return (
    <>
      <h4>Фильтры</h4>
      <Filter
        filtering={updateDataTable}
        data={dataTable}
        fullData={props.data}
      />      
      <table>
        <TableHead head={Object.keys(props.data[0])} />
        <TableBody
          body={dataTable}
          amountRows={rowsToShow}
          numPage={activePage}
        />
      </table>
      {n > 1 && <div className='pagination'>{pages}</div>}
    </>
  );
};

export default Table;