import { allowedExts, loaderStart } from './_GLOBALS.js';
import { loader } from './Components.js';

const playerStyle = {
    position: "fixed",
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -100,
    objectFit: "contain",
} as playerStyle

/**
 * Method starting with "_" : helper
 */
class Player {
    private players: any;
    private currentMediaExt: string;
    private container: HTMLElement;
    private currentMediaId: number | null;
    private currentPlayerType: any;
    private options: any;
    private loaderStartTimeout: any;
    private loaderEl: HTMLDivElement;
    constructor(options: any) {
        if (!options.container) {
            throw new Error("You need to specify a valid container.");
        }
        this.options = options;
        this.container = options.container;
        this.players = {
            video: this.createPlayer("video"),
            image: this.createPlayer("image"),
        }
        this.currentMediaExt = "";
        this.currentMediaId = null;
        this.currentPlayerType = null;
        this.loaderStartTimeout = null;
        this.loaderEl = loader();
        this.toggleLoader("off");
    }
    /**
     * Finds the right player for the input file extension
     * 
     * @param ext 
     */
    private _findPlayerByExt(ext: string): string | undefined {
        for (const [key, extensions] of Object.entries(allowedExts)) {
            if (extensions.includes(ext)) return key;
        }
        return void 0;
    }

    /**
     * Once the loading is complete, sets the current id of the card displaying the last media
     * 
     * @param id 
     */
    public setCurrentMediaId(id: number): this {
        this.currentMediaId = id;
        return this;
    }

    public getCurrentMediaId(): number | null {
        return this.currentMediaId;
    }

    /**
     * Creates a dom elements able to display the current media
     * <img> for images, <video> for videos
     * 
     * @param type 
     */
    private createPlayer(type: mediaTypes): HTMLElement {
        switch (type) {
            case "video": {
                const player = document.createElement("video");
                const videoOptions = this.options.video;
                if (videoOptions.loop) player.setAttribute("loop", "");
                if (videoOptions.mute) player.setAttribute("muted", "");
                player.setAttribute("autoplay", "");
                Object.assign(player.style, playerStyle);
                return player;
            }
            case "image": {
                const player = document.createElement("img");
                Object.assign(player.style, playerStyle);
                return player;
            }
        }
    }

    /**
     * updates the player when a new card has been placed
     * 
     * @param mediaUrl 
     */
    public update(mediaUrl: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const ext = mediaUrl.split(".").pop() || "";
            if (ext === this.currentMediaExt) {
                this.playNew(mediaUrl, resolve);
                return;
            }
            const isSwitched = this.switchPlayerType(ext);
            if (isSwitched !== true) {
                reject(isSwitched); 
                return;
            } 
            this.playNew(mediaUrl, resolve);
        });
    }

    /**
     * switches the type of player if a new media required a different one has to be displayed
     * 
     * @param ext 
     */
    private switchPlayerType(ext: string): true | Error {
        const playerType = this._findPlayerByExt(ext);
        if (!playerType) return new Error(`${ext} isn't a supported file type.`);
        this.currentMediaExt = ext;
        this.currentPlayerType = playerType;
        return true;
    }

    /**
     * plays the new media appending the new tag to the dom,
     * also sets up a loader which displays when a media takes more than the specified amount of time to load
     * see loaderStart in _GLOBALS_
     * 
     * @param mediaUrl 
     * @param resolve 
     */
    private playNew(mediaUrl: string, resolve: Function): this {
        const newPlayer = this.players[this.currentPlayerType].cloneNode(true);
        newPlayer.src = mediaUrl;

        clearTimeout(this.loaderStartTimeout);
        this.loaderStartTimeout = setTimeout(() => {
            this.toggleLoader("on");
        }, loaderStart * 1000)

        const appendAndPlay = () => {
            clearTimeout(this.loaderStartTimeout);
            this.remove();
            this.container.appendChild(newPlayer);
            this.toggleLoader("off");
            resolve();
        }
        switch (newPlayer.tagName) {
            case "VIDEO": {
                newPlayer.addEventListener("canplay", appendAndPlay);
            }
            case "IMG": {
                newPlayer.addEventListener("load", appendAndPlay);
            }
        }
        return this;
    }

    /**
     * toggle the loader on and off
     * 
     * @param state 
     */
    toggleLoader(state: "on" | "off") {
        const cases = {
            on: () => {
                document.body.appendChild(this.loaderEl);
            },
            off: () => {
                this.loaderEl.remove();
            }
        } as { on: Function, off: Function }
        cases[state]();
    }

    /**
     * remove the current player from his container
     */
    public remove(): this {
        this.container.innerHTML = "";
        return this;
    }
}

export default Player;
