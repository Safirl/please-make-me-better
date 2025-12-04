import GUI from 'lil-gui';

type Folders = { [key: string]: GUI }

export default class Helpers {
    private GUI: GUI | null = null
    private folders = {} as Folders
    public isDevMode = false
    private static _instance: Helpers | null = null;
    constructor() {
        if (Helpers._instance) {
            return Helpers._instance;
        }

        Helpers._instance = this;
        this.isDevMode = process.env.EXPO_OS === 'web'
        if (!this.isDevMode) return

        this.GUI = new GUI()
    }

     public static get instance(): Helpers {
        if (!this._instance) {
            new Helpers();
        }
        return this._instance as Helpers;
    }


    tweak(
        name: string,
        value: any,
        onChange: Function,
        min = 0,
        max = 1,
        step = 0.1,
        folderName?: string
    ) {
        if (!this.isDevMode) return


        const folder = this.getGUIFolder(folderName)
        folder.add(
            value,
            name,
            min, max, step
        ).onChange(onChange)


    }


    getGUIFolder(name?: string): GUI {

        if (!name)
            return this.GUI as GUI



        const targetFolder = this.folders[name]

        if (targetFolder)
            return targetFolder as GUI



        const folder = (this.GUI as GUI).addFolder(name)

        this.folders[name as keyof Folders] = folder

        return folder
    }
}