import cl from './AdminModal.module.css'
import {ChangeEvent, FC} from "react";
import {BuildModalType} from "../../types/Types.ts";
import TextInput from "../textInput/TextInput.tsx";
import FileInput from "../fileInput/FileInput.tsx";
import AdminButton from "../adminButton/AdminButton.tsx";
import createIcon from '../../../assets/icons/createIcon.svg'
import editIcon from '../../../assets/icons/editIcon.svg'
import {createBuild, editBuild, getBuilds} from "../../requests/RequestsBuild.ts";


const BuildModal: FC<BuildModalType> = ({modal, setModal, formInput, setFormInput,  createForm, setData}) => {

    return (
        <div className={modal ? [cl.adminModal, cl.active].join(' '): cl.adminModal} onClick={() => setModal(false)}>
            <div className={cl.modalInner} onClick={(event) => event.stopPropagation()}>
                <div className={cl.mainAdmin}>
                    <div className="container">
                        <div className={cl.mainAdminInner}>
                            <h1 className={cl.adminTitle}>Builds</h1>
                            <table className={cl.modalTable}>
                                <tbody>
                                <tr className={cl.tableRow}>
                                    <th className={cl.tableCell}>NAME</th>
                                    <th className={cl.tableCell}>TEXT</th>
                                    <th className={cl.tableCell}>IMAGE</th>
                                </tr>
                                <tr className={cl.tableRow}>
                                    <td>
                                        <TextInput value={formInput.name} placeholder={'name'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, name: event.target.value})}/>
                                    </td>
                                    <td>
                                        <TextInput value={formInput.text} placeholder={'text'} onChange={(event: ChangeEvent<HTMLInputElement>) => setFormInput({...formInput, text: event.target.value})}/>
                                    </td>
                                    <td>
                                        <FileInput img={formInput.imageFile ? formInput.imageFile : undefined} onChange={(event: ChangeEvent<HTMLInputElement>) => event.target.files? setFormInput({...formInput, imageFile: event.target.files[0]}) : null}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <AdminButton icon={createIcon} children={'CREATE BUILD'} onClick={() => {
                                            createBuild(createForm, formInput, setFormInput)
                                                .then(() => {
                                                    getBuilds(setData)
                                                        .catch(err => {
                                                            console.log(err)
                                                        })
                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                })
                                            setModal(false)

                                        }}/>
                                    </td>
                                    <td>
                                        <AdminButton icon={editIcon} children={'EDIT ENVIRONMENT'} onClick={() => {
                                            editBuild(createForm, formInput, setFormInput)
                                                .then(() => {
                                                    getBuilds(setData)
                                                        .catch(err => {
                                                            console.log(err)
                                                        })
                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                })
                                            setModal(false)
                                        }}/>
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

export default BuildModal;