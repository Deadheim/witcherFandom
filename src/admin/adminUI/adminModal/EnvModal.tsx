import cl from './AdminModal.module.css'
import {ChangeEvent, FC} from "react";
import {EnvModalType} from "../../types/Types.ts";
import TextInput from "../textInput/TextInput.tsx";
import CatSelect from "../catSelect/CatSelect.tsx";
import FileInput from "../fileInput/FileInput.tsx";
import AdminButton from "../adminButton/AdminButton.tsx";
import {
    createCategory, createEnvironment, deleteCategory, editEnvironment, getCategory, getEnvironments,
} from "../../requests/RequestsEnvironment.ts";
import createIcon from '../../../assets/icons/createIcon.svg'
import editIcon from '../../../assets/icons/editIcon.svg'


const EnvModal: FC<EnvModalType> = (
    {modal, setModal, formInput,
        setFormInput, categories, setCategories,
        activeCategory,setActiveCategory, createForm,
        setData}) => {
    return (
        <div className={modal ? [cl.adminModal, cl.active].join(' '): cl.adminModal} onClick={() => {
            setModal(false)
            setFormInput({
                id: '',
                name: '',
                text: '',
                alias: '',
                race: '',
                profession: '',
                nationality: '',
                categoryId: '',
                category: '',
                imageFile: undefined,
                imageName: '',
                imageSource: '',
            })
        }}>
            <div className={cl.modalInner} onClick={(event) => event.stopPropagation()}>
                <div className={cl.mainAdmin}>
                    <div className="container">
                        <div className={cl.mainAdminInner}>
                            <h1 className={cl.adminTitle}>Environments</h1>
                            <table className={cl.modalTable}>
                                <tbody>
                                    <tr className={cl.tableRow}>
                                        <th className={cl.tableCell}>NAME</th>
                                        <th className={cl.tableCell}>TEXT</th>
                                        <th className={cl.tableCell}>ALIAS</th>
                                        <th className={cl.tableCell}>RACE</th>
                                    </tr>
                                    <tr className={cl.tableRow}>
                                        <td>
                                            <TextInput value={formInput.name} placeholder={'name'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, name: event.target.value})}/>
                                        </td>
                                        <td>
                                            <TextInput value={formInput.text} placeholder={'text'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, text: event.target.value})}/>
                                        </td>
                                        <td>
                                            <TextInput value={formInput.alias} placeholder={'alias'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, alias: event.target.value})}/>
                                        </td>
                                        <td>
                                            <TextInput value={formInput.race} placeholder={'race'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, race: event.target.value})}/>
                                        </td>

                                    </tr>
                                    <tr>
                                        <th className={cl.tableCell}>PROFESSION</th>
                                        <th className={cl.tableCell}>NATIONALITY</th>
                                        <th className={cl.tableCell}>CATEGORY</th>
                                        <th className={cl.tableCell}>IMAGE</th>
                                    </tr>
                                    <tr className={cl.tableRow}>
                                        <td>
                                            <TextInput value={formInput.profession} placeholder={'profession'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, profession: event.target.value})}/>
                                        </td>
                                        <td>
                                            <TextInput value={formInput.nationality} placeholder={'nationality'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, nationality: event.target.value})}/>
                                        </td>
                                        <td>
                                            <CatSelect value={Object.values(activeCategory)[1]} defaultValue='Category' options={categories} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                                setFormInput({...formInput, categoryId: event.target.children[event.target.options.selectedIndex].id})
                                                setActiveCategory({id: event.target.children[event.target.options.selectedIndex].id, name: event.target.children[event.target.options.selectedIndex].textContent})
                                            }}/>
                                        </td>
                                        <td>
                                            <FileInput img={formInput.imageFile ? formInput.imageFile : undefined} onChange={(event: ChangeEvent<HTMLInputElement>) => event.target.files? setFormInput({...formInput, imageFile: event.target.files[0]}) : null}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <AdminButton icon={createIcon} children={'CREATE ENVIRONMENT'} onClick={() => {
                                                createEnvironment(createForm, formInput, setFormInput)
                                                    .then(() => {
                                                        getEnvironments(setData)
                                                            .catch(err => {
                                                                console.log(err)
                                                            })
                                                    })
                                                    .catch(err => {
                                                        console.log(err)
                                                    })
                                                setActiveCategory({
                                                    id: '',
                                                    name: ''
                                                })
                                                setFormInput({
                                                    id: '',
                                                    name: '',
                                                    text: '',
                                                    alias: '',
                                                    race: '',
                                                    profession: '',
                                                    nationality: '',
                                                    categoryId: '',
                                                    category: '',
                                                    imageFile: undefined,
                                                    imageName: '',
                                                    imageSource: '',
                                                })
                                                setModal(false)

                                            }}/>
                                        </td>
                                        <td>
                                            <AdminButton icon={editIcon} children={'EDIT ENVIRONMENT'} onClick={() => {
                                                editEnvironment(createForm, formInput, setFormInput)
                                                    .then(() => {
                                                        getEnvironments(setData)
                                                            .catch(err => {
                                                                console.log(err)
                                                            })
                                                    })
                                                    .catch(err => {
                                                        console.log(err)
                                                    })
                                                setActiveCategory({
                                                    id: '',
                                                    name: ''
                                                })
                                                setFormInput({
                                                    id: '',
                                                    name: '',
                                                    text: '',
                                                    alias: '',
                                                    race: '',
                                                    profession: '',
                                                    nationality: '',
                                                    categoryId: '',
                                                    category: '',
                                                    imageFile: undefined,
                                                    imageName: '',
                                                    imageSource: '',
                                                })
                                                setModal(false)
                                            }}/>
                                        </td>
                                        <td>
                                            <AdminButton icon={createIcon} children={'CREATE CATEGORY'} onClick={() => createCategory().then(() => getCategory(setCategories))}/>
                                        </td>
                                        <td>
                                            <AdminButton icon={createIcon} children={'DELETE CATEGORY'} onClick={() => deleteCategory(activeCategory)}/>
                                        </td>
                                    </tr>

                                </tbody>


                            </table>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnvModal;