import Header from "../../components/Header.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import '../../App.css'
import cl from './AdminPages.module.css'
import AdminButton from "../adminUI/adminButton/AdminButton.tsx";
import SearchInput from "../adminUI/searchInput/SearchInput.tsx";
import {
    deleteEnvironment, getCategory, getEnvironmentById, getEnvironments,
} from "../requests/RequestsEnvironment.ts";
import {Category, Environment} from "../types/Types.ts";
import editBtn from '../../assets/icons/editIcon.svg';
import deleteBtn from '../../assets/icons/deleteIcon.svg';
import createBtn from '../../assets/icons/createIcon.svg'
import searchBtn from '../../assets/icons/searchIcon.svg'
import sortIcon from '../../assets/icons/sortIcon.svg';
import EnvModal from "../adminUI/adminModal/EnvModal.tsx";
import SortCheck from "../adminUI/sortCheck/SortCheck.tsx";



const AEnvironment = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState<Environment[]>([]);
    const [categories, setCategories] = useState<Category[]>([])

    const options = [
        {value: 'name', name: 'byName'},
        {value: 'category', name: 'byCategory'},

    ]
    const [activeCategory, setActiveCategory] = useState<object>({
        id: '',
        name: ''
    })
    const [activeSort, setActiveSort] = useState<string>('')
    const [formInput, setFormInput] = useState<Environment>({
        id: '',
        name: '',
        text: '',
        alias: '',
        race: '',
        profession: '',
        nationality: '',
        categoryId: '',
        category: '',
        imageSource: '',
        imageFile: undefined,
    })
    const [modal, setModal] = useState<boolean>(false)

    useEffect( ()  => {
        getEnvironments(setData)
            .catch(error => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        const environment = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        if (search) {
            setData(environment)
        } else {
            getEnvironments(setData)
                .catch(error => {
                    console.log(error)
                })
        }
    }, [search]);

    const sortedData = (sort: keyof Pick<Environment, "name" | 'category'>) => {
        setActiveSort(sort)
        if (data !== undefined) {
            setData([...data].sort((a, b) => a[sort].localeCompare(b[sort])))

        }
    }

    const createForm = (data: Environment) => {
        const formData = new FormData();
        formData.append('id', data.id)
        formData.append('name', data.name)
        formData.append('text', data.text)
        formData.append('alias', data.alias)
        formData.append('race', data.race)
        formData.append('profession', data.profession)
        formData.append('nationality', data.nationality)
        formData.append('categoryId', data.categoryId)
        formData.append('imageFile', data.imageFile as File)
        return formData
    }

    return (
        <div className={cl.adminPage}>
            <Header navBar={['environments', 'equipments', 'builds']} logoText={'ADMIN'}/>
            <div className="container">
                <div className={cl.mainList}>
                    <EnvModal
                        modal={modal}
                        setModal={setModal}
                        formInput={formInput}
                        setFormInput={setFormInput}
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        createForm={createForm}
                        setData={setData}
                        setCategories={setCategories}
                    />
                    <div className={cl.searchBlock}>
                        <div className={cl.searchBlockHeader}>
                            <h2 className={cl.searchBlockTitle}>
                                Table Environments
                            </h2>
                            <AdminButton icon={createBtn} children='CREATE' onClick={() => {
                                setModal(true)
                                getCategory(setCategories)
                                    .catch(err => {
                                        console.log(err)
                                    })

                            }}/>
                        </div>
                        <div className={cl.searchBlockInner}>
                            <div className={cl.searchInput}>
                               <div>
                                   <div className={cl.searchInputTitle}>
                                       <img src={searchBtn} alt="" width={19}/>
                                       <span>Find something</span>
                                   </div>
                                   <SearchInput placeholder={'Search...'}  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}/>
                               </div>
                                <div>
                                    <div className={cl.searchInputTitle}>
                                        <img src={sortIcon} alt="" width={25}/>
                                        <span>Sort by something</span>
                                    </div>
                                    <SortCheck value={activeSort} options={options} defaultValue={'Sort'} onChange={sortedData}/>
                                </div>

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
                                        <AdminButton icon={editBtn} onClick={() => {
                                            setModal(true)
                                            getEnvironmentById(item.id, setFormInput)
                                                .catch(error => {
                                                    console.log(error)
                                                })
                                            getCategory(setCategories)
                                                .catch(error => {
                                                    console.log(error)
                                                })

                                        }} children={'EDIT'}/>
                                        <AdminButton icon={deleteBtn} children={'DELETE'} onClick={() => deleteEnvironment(item.id).then(() => {
                                            getEnvironments(setData)
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

export default AEnvironment;