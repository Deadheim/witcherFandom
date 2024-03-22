import axios from "axios"
import {Category, Environment} from "../types/Types.ts";
import React from "react";
import {apiKeys} from "../env/Env.ts";

export const createCategory = async () => {
    const cat: object = {
        name: prompt('Введите название категории')
    }
    await axios.post(apiKeys.ENVCAT_API, cat)
        .then(res => {
            console.log(res)
        })
}
export const getCategory = async (setCategories: React.Dispatch<React.SetStateAction<Category[]>>) => {
    try {
        const {data} = await axios.get<{environemntCategories: Category[]}>(apiKeys.ENVCAT_API)
        setCategories(data.environemntCategories)
    } catch (error) {
        console.log(error)
    }
}

export const deleteCategory = async (activeCategory: object) => {
    await axios.delete(apiKeys.ENVCAT_API + Object.values(activeCategory)[0])
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

}

export const createEnvironment = async (createForm: (formInput: Environment) => FormData, formInput: Environment, setFormInput: React.Dispatch<React.SetStateAction<Environment>>) => {
    const formData = createForm(formInput)
    await axios.post(apiKeys.ENV_API, formData)
        .then(res => {
            console.log(res)
        })
    setFormInput({id: '',
        name: '',
        text: '',
        alias: '',
        race: '',
        profession: '',
        nationality: '',
        categoryId: formInput.categoryId,
        imageFile: undefined,
        category: '',
    })


}


export const editEnvironment = async (createForm: (formInput: Environment) => FormData, formInput: Environment, setFormInput: React.Dispatch<React.SetStateAction<Environment>>) => {
    const formData = createForm(formInput)
    await axios.put(apiKeys.ENV_API, formData)
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
        alias: '',
        race: '',
        profession: '',
        nationality: '',
        categoryId: formInput.categoryId,
        imageFile: undefined,
        category: ''
    })
}

export const deleteEnvironment = async (
    itemId: string
    ) => {
    await axios.delete(apiKeys.ENV_API + itemId)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })

}

export const getEnvironments = async (setData: React.Dispatch<React.SetStateAction<Environment[]>>) =>{
    try {
        const {data} = await axios.get<{environments: Environment[]}>(apiKeys.ENV_API)
        setData(data.environments)

    } catch (err) {
        console.log(err)
    }
}

export const getEnvironmentById = async (itemId: string, setFormInput: React.Dispatch<React.SetStateAction<Environment>>) => {
    await axios.get(apiKeys.ENV_API + itemId)
        .then(response => {
            const data = response.data
            console.log(data)
            setFormInput({
                id: data.id,
                name: data.name,
                text: data.text,
                alias: data.alias,
                race: data.race,
                profession: data.profession,
                nationality: data.nationality,
                categoryId: data.categoryId,
                imageSource: data.imageSource,
                imageName: data.imageName,
                imageFile: data.imageFile,
                category: data.category

            })
        })
        .catch(err => {
            console.log(err)
        })
}
