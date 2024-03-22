import axios from "axios";
import {apiKeys} from "../env/Env.ts";
import {Build} from "../types/Types.ts";
import React from "react";

export const createBuild = async (createForm: (formInput: Build) => FormData, formInput: Build, setFormInput: React.Dispatch<React.SetStateAction<Build>>) => {
    const formData = createForm(formInput)
    await axios.post(apiKeys.BUILD_API, formData)
        .then(res => {
            console.log(res)
        })
    setFormInput({
        id: '',
        name: '',
        text: '',
        imageFile: undefined,
        imageName: '',
        imageSource: ''
    })
}

export const editBuild = async (createForm: (formInput: Build) => FormData, formInput: Build, setFormInput: React.Dispatch<React.SetStateAction<Build>>) => {
    const formData = createForm(formInput)
    await axios.put(apiKeys.BUILD_API, formData)
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
        imageFile: undefined,
        imageName: '',
        imageSource: ''
    })
}

export const deleteBuild = async (itemId: string) => {
    await axios.delete(apiKeys.BUILD_API + itemId)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export async function getBuilds(setData: React.Dispatch<React.SetStateAction<Build[]>>) {
    try {
        const {data} = await axios.get<{builds: Build[]}>(apiKeys.BUILD_API)
        setData(data.builds)

    } catch (err) {
        console.log(err)
    }
}

export const getBuildById = async (itemId: string, setFormInput: React.Dispatch<React.SetStateAction<Build>>) => {
    await axios.get(apiKeys.BUILD_API + itemId)
        .then(response => {
            const data = response.data
            setFormInput({
                id: data.id,
                name: data.name,
                text: data.text,
                imageFile: undefined,
                imageName: data.imageName,
                imageSource: data.imageSource
            })
        })
}
