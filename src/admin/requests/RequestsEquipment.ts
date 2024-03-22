import React from "react";
import axios from "axios"
import {Category, Equipment, Type} from "../types/Types.ts";
import {apiKeys} from "../env/Env.ts";


export const createCategory = async () => {
    const cat: object = {
        name: prompt('Введите название категории')
    }
    await axios.post(apiKeys.EQUIPCAT_API, cat)
        .then(res => {
            console.log(res)
        })
}

export const createType = async () => {
    const cat: object = {
        name: prompt('Введите название типа')
    }
    await axios.post(apiKeys.EQUIPTYPE_API, cat)
        .then(res => {
            console.log(res)
        })
}

export const getCategoryAndType = async (setCategories: React.Dispatch<React.SetStateAction<Category[]>>, setTypes: React.Dispatch<React.SetStateAction<Type[]>>) => {

    try {
        const {data} = await axios.get<{equipmentCategories: Category[]}>(apiKeys.EQUIPCAT_API)

        setCategories(data.equipmentCategories)

    } catch (error) {
        console.log(error)
    }

    try {
        const {data} = await axios.get<{equipmentTypes: Category[]}>(apiKeys.EQUIPTYPE_API)

        setTypes(data.equipmentTypes)

    } catch (error) {
        console.log(error)
    }


}

export const deleteCategory = async (activeCategory: object) => {
    await axios.delete(apiKeys.EQUIPCAT_API + Object.values(activeCategory)[0])
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

}

export const deleteType = async (activeType: object) => {
    await axios.delete(apiKeys.EQUIPTYPE_API + Object.values(activeType)[0])
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

}

export const createEquipment = async (createForm: (formInput: Equipment) => FormData, formInput: Equipment, setFormInput: React.Dispatch<React.SetStateAction<Equipment>>) => {
    const formData = createForm(formInput)
    await axios.post(apiKeys.EQUIP_API, formData)
        .then(res => {
            console.log(res)
        })
    setFormInput({
        id: '',
        name: '',
        text: '',
        damage: '',
        armor: '',
        effect: '',
        typeId: formInput.categoryId,
        categoryId: formInput.categoryId,
        imageFile: undefined,
        imageSource: '',
        imageName: '',
        type: '',
        category: ''
    })
}


export const editEquipment = async (createForm: (formInput: Equipment) => FormData, formInput: Equipment, setFormInput: React.Dispatch<React.SetStateAction<Equipment>>) => {
    const formData = createForm(formInput)
    await axios.put(apiKeys.EQUIP_API, formData)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    setFormInput({
        id: '',
        name: '',
        text: '',
        damage: '',
        armor: '',
        effect: '',
        typeId: formInput.typeId,
        categoryId: formInput.categoryId,
        imageFile: undefined,
        imageSource: '',
        imageName: '',
        type: '',
        category: ''
    })
}

export const deleteEquipment = async (itemId:string) => {
    await axios.delete(apiKeys.EQUIP_API + itemId)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export async function getEquipments(setData: React.Dispatch<React.SetStateAction<Equipment[]>>) {
    try {
        const {data} = await axios.get<{equipments: Equipment[]}>(apiKeys.EQUIP_API)
        setData(data.equipments)

    } catch (err) {
        console.log(err)
    }
}

export const getEquipmentById = async (itemId: string, setFormInput: React.Dispatch<React.SetStateAction<Equipment>>) => {
    await axios.get(apiKeys.EQUIP_API + itemId)
        .then(response => {
            const data = response.data
            setFormInput({
                id: data.id,
                name: data.name,
                text: data.text,
                damage: data.damage,
                armor: data.armor,
                effect: data.effect,
                typeId: data.typeId,
                categoryId: data.categoryId,
                imageFile: data.imageFile,
                imageSource: data.imageSource,
                imageName: data.imageName,
                type: data.type,
                category: data.category
            })
        })
        .catch(err => {
            console.log(err)
        })
}