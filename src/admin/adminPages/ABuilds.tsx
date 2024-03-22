import Header from "../../components/Header.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {Build} from "../types/Types.ts";
import cl from "./AdminPages.module.css";

import AdminButton from "../adminUI/adminButton/AdminButton.tsx";
import SearchInput from "../adminUI/searchInput/SearchInput.tsx";
import {getBuilds, deleteBuild, getBuildById} from "../requests/RequestsBuild.ts";
import createBtn from "../../assets/icons/createIcon.svg";
import searchBtn from "../../assets/icons/searchIcon.svg";
import editBtn from "../../assets/icons/editIcon.svg";
import deleteBtn from "../../assets/icons/deleteIcon.svg";
import BuildModal from "../adminUI/adminModal/BuildModal.tsx";

const ABuilds = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState<Build[]>([])
    const [modal, setModal] = useState<boolean>(false)
    const [formInput, setFormInput] = useState<Build>({
        id: '',
        name: '',
        text: '',
        imageFile: undefined,
        imageName: '',
        imageSource: ''
    })


    useEffect( ()  => {
        getBuilds(setData)
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect( ()  => {
        const builds = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        if (search) {
            setData(builds)
        } else {
            getBuilds(setData)
                .catch(err => {
                    console.log(err)
                })
        }


    }, [search])

    const createForm = (data: Build) => {
        const formData = new FormData();
        formData.append('id', data.id)
        formData.append('name', data.name)
        formData.append('text', data.text)
        formData.append('imageFile', data.imageFile as File)
        return formData
    }


    return (
        <div className={cl.adminPage}>
            <Header navBar={['environments', 'equipments', 'builds']} logoText={'ADMIN'}/>
            <div className={cl.mainAdmin}>
                <div className="container">
                    <div className={cl.mainList}>
                        <BuildModal
                            modal={modal}
                            setModal={setModal}
                            formInput={formInput}
                            setFormInput={setFormInput}
                            createForm={createForm}
                            setData={setData}
                        />
                        <div className={cl.searchBlock}>
                            <div className={cl.searchBlockHeader}>
                                <h2 className={cl.searchBlockTitle}>
                                    Table Environments
                                </h2>
                                <AdminButton icon={createBtn} children='CREATE' onClick={() => {
                                    setModal(true)

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
                                            <AdminButton icon={editBtn} onClick={() => {
                                                setModal(true)
                                                getBuildById(item.id, setFormInput)
                                                    .catch(err => {
                                                        console.log(err)
                                                    })


                                            }} children={'EDIT'}/>
                                            <AdminButton icon={deleteBtn} children={'DELETE'} onClick={() => deleteBuild(item.id).then(() => {
                                                getBuilds(setData)
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
        </div>
    );
};

export default ABuilds;