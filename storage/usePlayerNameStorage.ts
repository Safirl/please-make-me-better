import { create } from 'zustand'



export type UserNameStateType = {
    userName: string,
    setUserName: (name: string) => void
}


export const usePlayerNameStorage = create<UserNameStateType>((set) => ({
    userName: "",
    setUserName: (name: string) => {
        if (!name) throw "Error: Trying to store an empty name"

        set(state => {
            state.userName = name

            return state
        })

    }

}))