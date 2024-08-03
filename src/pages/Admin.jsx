import useForm from '../hooks/useForm'
import { useEffect, useState } from 'react'
import { Drawer } from '../components/ui/Drawer/Drawer'
import Table from '../components/ui/Table/Table'
import useItemsStore from '../store/useItemsStore'
import { Alert } from '../components/ui/Alert/Alert'

const Admin = () => {
  // Стейт для скрытия/показа компонента Drawer
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  // Стейт для скрытия/показа и передачи сообщения в Alert
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: '',
  })

  // Обработчик закрытия компонента Alert
  const handleCloseAlert = () => {
    setAlertState({ ...alertState, isOpen: false })
  }

  // Стейт для показа детальной информации по товару в Drawer
  const [selectedValue, setSelectedValue] = useState(null)

  // Стейт для переключения режима редактирования
  const [isEditing, setIsEditing] = useState(false)

  // Стор для CRUD операций.
  const { items, fetchItems, addItem, editItem, deleteItem } = useItemsStore()

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  /**
   * Обработка отправки формы.
   * Если товар выбран, то редактируем его, иначе добавляем новый товар.
   *
   * @param {Event} event - Событие отправки формы.
   * @returns {void}
   */
  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (selectedValue) {
      // Если товар выбран, редактируем его
      editItem(selectedValue?.id, formValues)

      setAlertState({
        isOpen: true,
        message: 'Товар был успешно отредактирован.',
      })
    } else {
      // Если товар не выбран, добавляем новый товар
      addItem(formValues)
      setAlertState({
        isOpen: true,
        message: 'Товар был успешно добавлен.',
      })
    }
    setDrawerOpen(false)
    resetForm()
  }

  /**
   * Обрабатывает редактирование товара.
   *
   * @returns {void}
   */
  const handleEditItem = () => {
    setIsEditing(true)
  }

  /**
   * Обрабатывает удаление товара.
   *
   * @returns {void}
   */
  const handleDeleteItem = () => {
    if (selectedValue) {
      deleteItem(selectedValue?.id)
      setDrawerOpen(false)
      setSelectedValue(null)
      setIsEditing(false) // Сбрасываем режим редактирования
      setAlertState({
        isOpen: true,
        message: 'Товар был удален.',
      })
    }
  }

  // Обработка данных формы.
  const { formValues, handleInput, resetForm } = useForm({
    name: '',
    category: '',
    description: '',
    card: '',
    regular: '',
    imgSrc: '',
  })

  /**
   * Обрабатывает двойной клик по строке таблицы.
   *
   * @param {Object} rowData - Данные строки, по которой был выполнен двойной клик.
   * @returns {void}
   */
  const handleRowDoubleClick = (rowData) => {
    setSelectedValue(rowData)
    setDrawerOpen(true)
    setIsEditing(false) // Режим просмотра по умолчанию
  }

  /**
   * Закрывает компонент Drawer и очищает выбранное значение.
   *
   * @returns {void}
   */
  const handleCloseDrawer = () => {
    setDrawerOpen(false)
    setSelectedValue(null)
    setIsEditing(false) // Сбрасываем режим редактирования
    resetForm()
  }

  return (
    <section className="admin">
      <div className="container">
        <h2 className="mb-4 text-4xl font-bold text-zinc-800 mt-20">
          Страница управления товарами
        </h2>

        <button
          className="bg-orange-500 mb-4 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setSelectedValue(null)
            setIsEditing(true)
            setDrawerOpen(true)
          }}
        >
          Добавить товар
        </button>

        <Table
          headers={[
            { key: 'name', title: 'Название' },
            { key: 'category', title: 'Категория' },
            { key: 'description', title: 'Описание' },
            { key: 'rating', title: 'Рейтинг' },
            { key: 'card', title: 'Цена по карте' },
            { key: 'regular', title: 'Обычная цена' },
          ]}
          data={items}
          onRowDoubleClick={handleRowDoubleClick}
        />

        {isDrawerOpen && (
          <Drawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            title={
              selectedValue
                ? isEditing
                  ? 'Редактирование товара'
                  : 'Чтение данных по товару'
                : 'Добавление нового товара'
            }
          >
            <div className="w-full max-w-xs">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Название товара
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    type="text"
                    defaultValue={selectedValue?.name || formValues?.name}
                    onChange={handleInput}
                    placeholder="Введите название"
                    readOnly={!isEditing}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Категория товара
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="category"
                    type="text"
                    defaultValue={
                      selectedValue?.category || formValues?.category
                    }
                    onChange={handleInput}
                    placeholder="Введите категорию"
                    readOnly={!isEditing}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Описание товара
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="description"
                    type="text"
                    defaultValue={
                      selectedValue?.description || formValues?.description
                    }
                    onChange={handleInput}
                    placeholder="Введите описание"
                    readOnly={!isEditing}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="card"
                  >
                    Цена по карте
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="card"
                    type="number"
                    defaultValue={selectedValue?.card || formValues?.card}
                    onChange={handleInput}
                    placeholder="Введите цену"
                    readOnly={!isEditing}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="regular"
                  >
                    Обычная цена
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="regular"
                    type="number"
                    defaultValue={selectedValue?.regular || formValues?.regular}
                    onChange={handleInput}
                    placeholder="Введите цену"
                    readOnly={!isEditing}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="imgSrc"
                  >
                    Изображение
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="imgSrc"
                    type="url"
                    defaultValue={selectedValue?.imgSrc || formValues?.imgSrc}
                    onChange={handleInput}
                    placeholder="Введите url"
                    readOnly={!isEditing}
                  />
                </div>

                <div className="flex gap-4">
                  {!isEditing && selectedValue && (
                    <>
                      <button
                        className="bg-orange-500 mb-4 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleEditItem}
                      >
                        Редактировать
                      </button>
                      <button
                        className="bg-[rgb(244,63,94)] mb-4 hover:bg-[rgb(244,63,94)] text-white font-bold py-2 px-4 rounded"
                        onClick={handleDeleteItem}
                      >
                        Удалить
                      </button>
                    </>
                  )}
                  {isEditing && (
                    <button className="bg-orange-500 mb-4 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                      Сохранить
                    </button>
                  )}
                </div>
              </form>
            </div>
          </Drawer>
        )}

        <Alert
          variant="neutral"
          subtitle={alertState?.message}
          isOpen={alertState?.isOpen}
          onClose={handleCloseAlert}
        />
      </div>
    </section>
  )
}

export default Admin
