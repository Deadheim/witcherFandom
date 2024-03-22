
import Header from "../../components/Header.tsx";
import cl from "./AdminPages.module.css";
import {ChangeEvent, useEffect, useState} from "react";
import {Category, Equipment, Type} from "../types/Types.ts";
import AdminButton from "../adminUI/adminButton/AdminButton.tsx";
import {
    deleteEquipment,
    getEquipments,
    getCategoryAndType, getEquipmentById,
} from "../requests/RequestsEquipment.ts";
import SearchInput from "../adminUI/searchInput/SearchInput.tsx";
import createBtn from "../../assets/icons/createIcon.svg";
import searchBtn from "../../assets/icons/searchIcon.svg";
import editBtn from "../../assets/icons/editIcon.svg";
import deleteBtn from "../../assets/icons/deleteIcon.svg";
import EquipModal from "../adminUI/adminModal/EquipModal.tsx";



const AEquipments = () => {
    const [formInput, setFormInput] = useState<Equipment>({
        id: '',
        name: '',
        text: '',
        damage: '',
        armor: '',
        effect: '',
        typeId: '',
        categoryId: '',
        imageFile: undefined,
        imageSource: '',
        imageName: '',
        type: '',
        category: ''
    })
    const [data, setData] = useState<Equipment[]>([]);

    const [categories, setCategories] = useState<Category[]>([])
    const [search, setSearch] = useState('');
    const [types, setTypes] = useState<Type[]>([])
    const [activeCategory, setActiveCategory] = useState<object>({
        id: '',
        name: ''
    })
    const [activeType, setActiveType] = useState<object>({
        id: '',
        name: ''
    })
    const [modal, setModal] = useState<boolean>(false)


    useEffect( ()  => {
        getEquipments(setData)
            .catch(err => {
                console.log(err)
            })


    }, [])
    useEffect(() => {
        const equipment = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        if (search) {
            setData(equipment)
        } else {
            getEquipments(setData)
                .catch(error => {
                    console.log(error)
                })
        }

    }, [search]);

    const createForm = (data: Equipment) => {
        const formData = new FormData();
        formData.append('id', data.id)
        formData.append('name', data.name)
        formData.append('text', data.text)
        formData.append('damage', data.damage)
        formData.append('armor', data.armor)
        formData.append('effect', data.effect)
        formData.append('typeId', data.typeId)
        formData.append('categoryId', data.categoryId)
        formData.append('imageFile', data.imageFile as File)
        return formData

    }



    return (
        <div className={cl.adminPage}>
            <Header navBar={['environments', 'equipments', 'builds']} logoText={'ADMIN'}/>
                <div className="container">
                    <div className={cl.mainList}>
                        <EquipModal
                            modal={modal}
                            setModal={setModal}
                            formInput={formInput}
                            setFormInput={setFormInput}
                            categories={categories}
                            types={types}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            activeType={activeType}
                            setActiveType={setActiveType}
                            createForm={createForm}
                            setData={setData}
                            setCategories={setCategories}
                            setTypes={setTypes}
                        />
                        <div className={cl.searchBlock}>
                            <div className={cl.searchBlockHeader}>
                                <h2 className={cl.searchBlockTitle}>
                                    Table Equipments
                                </h2>
                                <AdminButton icon={createBtn} children='CREATE' onClick={() => {
                                    setModal(true)
                                    getCategoryAndType(setCategories, setTypes)
                                        .catch(error => {
                                            console.log(error)
                                        })
                                }}/>
                            </div>
                            <div className={cl.searchBlockInner}>
                                <div className={cl.searchInput}>
                                    <div className={cl.searchInputTitle}>
                                        <img src={searchBtn} alt="" width={19}/>
                                        <span>Find something</span>
                                    </div>
                                    <SearchInput placeholder={'Search...'}  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}/>
                                </div>

                            </div>
                        </div>
                        <table className={cl.mainTable}>
                            <tbody>
                            <tr className={cl.tableRow}>
                                <th className={cl.tableCell}>№</th>
                                <th className={cl.tableCell}>NAME</th>
                                <th className={cl.tableCell}>TEXT</th>
                                <th className={cl.tableCell}>IMAGE NAME</th>
                                <th className={cl.tableCell}>IMAGE SOURCE</th>
                                <th className={cl.tableCell}>CATEGORY</th>
                                <th className={cl.tableCell}>TYPE</th>
                                <th className={cl.tableCell}>ACTIONS</th>
                            </tr>

                            {data ? data.map((item, index) => {
                                return (
                                    <tr key={index}  className={cl.tableRow}>
                                        <td className={cl.tableCell}>
                                            <span className={cl.listItem}>{index + 1}</span>
                                        </td>
                                        <td className={cl.tableCell}>
                                            <span className={cl.listItem}>{item.name}</span>
                                        </td>
                                        <td className={cl.tableCell}>
                                            <span className={cl.listItem}>{item.text}</span>
                                        </td>
                                        <td className={cl.tableCell}>
                                            <span className={cl.listItem}>{item.imageName}</span>
                                        </td>
                                        <td className={cl.tableCell}>
                                            <span className={cl.listItem}>{item.imageSource}</span>
                                        </td>
                                        <td className={cl.tableCell}>
                                            <span className={cl.listItem}>{item.category}</span>
                                        </td>
                                        <td className={cl.tableCell}>
                                            <span className={cl.listItem}>{item.type}</span>
                                        </td>
                                        <td className={cl.tableCell}>
                                            <AdminButton icon={editBtn} onClick={() => {
                                                setFormInput({
                                                    id: item.id,
                                                    name: item.name,
                                                    text: '',
                                                    damage: '',
                                                    armor: '',
                                                    effect: '',
                                                    typeId: '',
                                                    categoryId: '',
                                                    imageFile: undefined,
                                                    imageSource: '',
                                                    imageName: '',
                                                    type: '',
                                                    category: ''
                                                })
                                                setModal(true)
                                                getEquipmentById(item.id, setFormInput)
                                                    .catch(err => {
                                                        console.log(err)
                                                    })

                                                getCategoryAndType(setCategories, setTypes)
                                                    .catch(error => {
                                                        console.log(error)
                                                    })


                                            }} children={'EDIT'}/>
                                            <AdminButton icon={deleteBtn} children={'DELETE'} onClick={() => deleteEquipment(item.id).then(() => {
                                                getEquipments(setData)
                                                    .catch(error => {
                                                        console.log(error)
                                                    })

                                            })}/>
                                        </td>

                                    </tr>
                                )
                            }) : null}

                            </tbody>
                        </table>

                    </div>

            </div>
        </div>
    );
};

export default AEquipments;