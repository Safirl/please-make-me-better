
import * as THREE from 'three';
import EventEmitter from "./EventEmitter";
import loadRessources from './sources';
import { Platform } from "react-native"
import { Asset } from "expo-asset"
interface Loaders {
    textureLoader: THREE.TextureLoader
}
interface Source {
    name: string;
    type: string;
    path: string[];
}

function loadImage(src: string): Promise<HTMLImageElement> {

    if (Platform.OS === "web") {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = src
        })
    }
     
    return new Promise(async (resolve, reject) => {
        try {
            const asset = Asset.fromURI(src)
            await asset.downloadAsync()
            resolve(asset)
        } catch (err) {
            reject(err)
        }
    })

}


export default class Ressources extends EventEmitter {

    public sources: Source[] | undefined
    public items: { [key: string]: any | THREE.Texture }
    public toLoad: number
    public loaded: number
    private loaders: Loaders | null = null


    constructor() {
        super()
        //Setup


        //SetUp
        this.items = {}
        this.toLoad = 0
        this.loaded = 0
        this.startLoading = this.startLoading.bind(this)
        this.setLoaders()
        this.loadAssets()

    }

    async loadAssets() {
        this.sources = await loadRessources()
        await this.startLoading()
    }

    setLoaders() {

        this.loaders = {
            textureLoader: new THREE.TextureLoader(),
        }

    }
    async startLoading() {
        if (!this.loaders) return false
        if (!this.sources) return false
        const hasBeenLoaded = false
        this.toLoad = this.sources.length


        const promises = this.sources.map(async (source) => {
            if (source.type === "texture") {
                const img = await loadImage(source.path[0])
                this.sourceLoaded(source, img)
            }
        })

        await Promise.all(promises)




        return hasBeenLoaded
    }
    sourceLoaded(source: Source, file: HTMLImageElement) {
        this.items[source.name] = file
        this.loaded++
        if (this.loaded === this.toLoad) {
            this.trigger('ready')
        }
    }
}