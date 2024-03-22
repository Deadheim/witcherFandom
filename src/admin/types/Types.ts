import React, {ChangeEvent} from "react";

export type Environment = {
    id: string
    name: string,
    text: string,
    alias: string,
    race: string,
    profession: string,
    nationality: string,
    categoryId: string,
    imageFile?: File | undefined,
    imageName?: string,
    imageSource?: string
    category: string
}



export type Category = {
    id: string & undefined,
    name: string,

}

export type Type = {
    id: string,
    name: string
}

export type Equipment = {
    id: string
    name: string,
    text: string,
    damage: string,
    armor: string,
    effect: string,
    typeId: string,
    categoryId: string,
    imageFile?: File | undefined,
    imageName?: string,
    imageSource?: string
    category?: string,
    type: string,


}

export type Build = {
    id: string,
    name: string,
    text: string,
    imageFile?: File | undefined,
    imageName: string,
    imageSource: string
}

export type EnvModalType = {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    formInput: Environment,
    setFormInput: React.Dispatch<React.SetStateAction<Environment>>,
    categories: Category[],
    activeCategory: object,
    setActiveCategory: React.Dispatch<React.SetStateAction<object>>,
    createForm: (data: Environment) => FormData,
    setData: React.Dispatch<React.SetStateAction<Environment[]>>,
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,

}

export type EquipModalType = {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    formInput: Equipment,
    setFormInput: React.Dispatch<React.SetStateAction<Equipment>>,
    categories: Category[],
    types: Type[],
    activeCategory: object,
    activeType: object,
    setActiveCategory: React.Dispatch<React.SetStateAction<object>>,
    setActiveType: React.Dispatch<React.SetStateAction<object>>,
    createForm: (data: Equipment) => FormData,
    setData: React.Dispatch<React.SetStateAction<Equipment[]>>,
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
    setTypes: React.Dispatch<React.SetStateAction<Type[]>>
}

export type BuildModalType = {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    formInput: Build,
    setFormInput: React.Dispatch<React.SetStateAction<Build>>,
    createForm: (data: Build) => FormData,
    setData: React.Dispatch<React.SetStateAction<Build[]>>,
}

export type searchInput = {
    placeholder: string,
    value?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

export type adminButton = {
    icon: string,
    children: string,
    onClick?: () => void,
}

export type CatSelectType = {
    value: string,
    defaultValue: string,
    options: Category[] | Type[],
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
}

export type fileInput = {
    img?: File,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

export type textInput = {
    placeholder?: string,
    value?: string | number,
    onChange?:  (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string

}