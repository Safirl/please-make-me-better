import { Asset } from 'expo-asset';



const createRessources = async (url: string = "") => {
    const [{ localUri }] = await Asset.loadAsync(url);
    return localUri
}

const loadRessources = async () => [
    {
        name: "pmb_noise",
        type: "texture",
        path: [`${await createRessources(require("@/assets/images/noise.png"))}`]
    }
]


export default loadRessources