// Компонент для фильтрации данных таблицы
// Предоставляет форму с полями для фильтрации по всем столбцам

const Filter = (props) => {
  // Обработчик отправки формы фильтрации
  const handleSubmit = (event) => {
    event.preventDefault();

    // Собирает значения полей формы в объект filterField
    const filterField = {
      Название: event.target.structure.value.toLowerCase(),
      Тип: event.target.type.value.toLowerCase(),
      Страна: event.target.country.value.toLowerCase(),
      Город: event.target.city.value.toLowerCase(),
      Год: [
        Number(event.target.yearMin.value) || null, // Минимальный год (или null)
        Number(event.target.yearMax.value) || null, // Максимальный год (или null)
      ],
      Высота: [
        Number(event.target.heightMin.value) || null, // Минимальная высота (или null)
        Number(event.target.heightMax.value) || null, // Максимальная высота (или null)
      ],
    };

    // Фильтрует данные по каждому полю формы
    let arr = props.fullData;
    for (const key in filterField) {
      const value = filterField[key];

      // Условия для числовых диапазонов
      if (key === 'Год' || key === 'Высота') {
        const [min, max] = value;
        arr = arr.filter((item) => {
          const itemValue = item[key];
          return (
            (min === null || itemValue >= min) &&
            (max === null || itemValue <= max)
          );
        });
      } else if (value) {
        // Фильтрация по строковым полям
        arr = arr.filter((item) =>
          item[key].toLowerCase().includes(value)
        );
      }
    }

    // Передаёт отфильтрованные данные в родительский компонент
    props.filtering(arr);
  };

  // Сбрасывает фильтры, восстанавливая исходные данные
  const handleClear = () => {
    props.filtering(props.fullData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>Название:</label>
        <input name="structure" type="text" />
      </p>
      <p>
        <label>Тип:</label>
        <input name="type" type="text" />
      </p>
      <p>
        <label>Страна:</label>
        <input name="country" type="text" />
      </p>
      <p>
        <label>Город:</label>
        <input name="city" type="text" />
      </p>
      <p>
        <label>Год от:</label>
        <input name="yearMin" type="number" />
      </p>
      <p>
        <label>Год до:</label>
        <input name="yearMax" type="number" />
      </p>
      <p>
        <label>Высота от:</label>
        <input name="heightMin" type="number" />
      </p>
      <p>
        <label>Высота до:</label>
        <input name="heightMax" type="number" />
      </p>
      <p>
        <button type="submit">Фильтровать</button>
        <button type="reset" onClick={handleClear}>
          Очистить фильтры
        </button>
      </p>
    </form>
  );
};

export default Filter;