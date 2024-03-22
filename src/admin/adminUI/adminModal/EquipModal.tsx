import cl from './AdminModal.module.css'
import {ChangeEvent, FC} from "react";
import {EquipModalType} from "../../types/Types.ts";
import TextInput from "../textInput/TextInput.tsx";
import CatSelect from "../catSelect/CatSelect.tsx";
import FileInput from "../fileInput/FileInput.tsx";
import AdminButton from "../adminButton/AdminButton.tsx";
import createIcon from '../../../assets/icons/createIcon.svg'
import editIcon from '../../../assets/icons/editIcon.svg'
import {
    createCategory,
    createEquipment,
    createType, deleteCategory,
    deleteType,
    editEquipment, getCategoryAndType,
    getEquipments
} from "../../requests/RequestsEquipment.ts";


const EquipModal: FC<EquipModalType> = ({modal, setModal, formInput, setFormInput, categories, setCategories, activeCategory,setActiveCategory, createForm, setData, types, activeType, setActiveType, setTypes}) => {
    return (
        <div className={modal ? [cl.adminModal, cl.active].join(' '): cl.adminModal} onClick={() => setModal(false)}>
            <div className={cl.modalInner} onClick={(event) => event.stopPropagation()}>
                <div className={cl.mainAdmin}>
                    <div className="container">
                        <div className={cl.mainAdminInner}>
                            <h1 className={cl.adminTitle}>Equipments</h1>
                            <table className={cl.modalTable}>
                                <tbody>
                                <tr className={cl.tableRow}>
                                    <th className={cl.tableCell}>NAME</th>
                                    <th className={cl.tableCell}>TEXT</th>
                                    <th className={cl.tableCell}>DAMAGE</th>
                                    <th className={cl.tableCell}>ARMOR</th>
                                </tr>
                                <tr className={cl.tableRow}>
                                    <td>
                                        <TextInput value={formInput.name} placeholder={'name'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, name: event.target.value})}/>
                                    </td>
                                    <td>
                                        <TextInput value={formInput.text} placeholder={'text'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, text: event.target.value})}/>
                                    </td>
                                    <td>
                                        <TextInput value={formInput.damage} placeholder={'damage'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, damage: event.target.value})}/>
                                    </td>
                                    <td>
                                        <TextInput value={formInput.armor} placeholder={'armor'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, armor: event.target.value})}/>
                                    </td>

                                </tr>
                                <tr>
                                    <th className={cl.tableCell}>EFFECT</th>
                                    <th className={cl.tableCell}>CATEGORY</th>
                                    <th className={cl.tableCell}>TYPE</th>
                                    <th className={cl.tableCell}>IMAGE</th>
                                </tr>
                                <tr className={cl.tableRow}>
                                    <td>
                                        <TextInput value={formInput.effect} placeholder={'effect'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, effect: event.target.value})}/>
                                    </td>

                                    <td>
                                        <CatSelect value={Object.values(activeCategory)[1]} defaultValue='Category' options={categories} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                            setFormInput({...formInput, categoryId: event.target.children[event.target.options.selectedIndex].id})
                                            setActiveCategory({id: event.target.children[event.target.options.selectedIndex].id, name: event.target.children[event.target.options.selectedIndex].textContent})
                                        }}/>
                                    </td>
                                    <td>
                                        <CatSelect value={Object.values(activeType)[1]} defaultValue='Type' options={types} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                            setFormInput({...formInput, typeId: event.target.children[event.target.options.selectedIndex].id})
                                            setActiveType({id: event.target.children[event.target.options.selectedIndex].id, name: event.target.children[event.target.options.selectedIndex].textContent})
                                        }}/>
                                    </td>
                                    <td>
                                        <FileInput img={formInput.imageFile ? formInput.imageFile : undefined} onChange={(event: ChangeEvent<HTMLInputElement>) => event.target.files? setFormInput({...formInput, imageFile: event.target.files[0]}) : null}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <AdminButton icon={createIcon} children={'CREATE EQUIPMENT'} onClick={() => {
                                            createEquipment(createForm, formInput, setFormInput)
                                                .then(() => {
                                                    getEquipments(setData)
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
                                            setModal(false)

                                        }}/>
                                    </td>
                                    <td>
                                        <AdminButton icon={editIcon} children={'EDIT EQUIPMENT'} onClick={() => {
                                            editEquipment(createForm, formInput, setFormInput)
                                                .then(() => {
                                                    getEquipments(setData)
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
                                            setModal(false)
                                        }}/>
                                    </td>
                                    <td>
                                        <AdminButton icon={createIcon} children={'CREATE CATEGORY'} onClick={() => createCategory().then(() => getCategoryAndType(setCategories, setTypes))}/>
                                    </td>
                                    <td>
                                        <AdminButton icon={createIcon} children={'CREATE TYPE'} onClick={() => createType().then(() => getCategoryAndType(setCategories, setTypes))}/>
                                    </td>


                                </tr>


                                </tbody>



                            </table>
                            <div>
                                <AdminButton icon={createIcon} children={'DELETE CATEGORY'} onClick={() => deleteCategory(activeCategory)}/>
                                <AdminButton icon={createIcon} children={'DELETE TYPE'} onClick={() => deleteType(activeType)}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipModal;