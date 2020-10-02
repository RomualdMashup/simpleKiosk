const allowedExts = {
    image: ["jpg", "png"],
    video: ["mp4"],
} as allowedExts

const playerStyle = {
    position: "fixed",
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -100,
    objectFit: "contain",
} as playerStyle

class Player {
    private players: any;
    private currentMediaExt: string;
    private container: HTMLElement;
    private currentMediaId: number | null;
    private currentPlayerType: any;
    private options: any;
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
    }

    private _findPlayerByExt(ext: string): string | undefined {
        for (const [key, extensions] of Object.entries(allowedExts)) {
            if (extensions.includes(ext)) return key;
        }
        return void 0;
    }

    public setCurrentMediaId(id: number): this {
        this.currentMediaId = id;
        return this;
    }

    public getCurrentMediaId(): number | null {
        return this.currentMediaId;
    }

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

    private switchPlayerType(ext: string): true | Error {
        const playerType = this._findPlayerByExt(ext);
        if (!playerType) return new Error(`${ext} isn't a supported file type.`);
        this.currentMediaExt = ext;
        this.currentPlayerType = playerType;
        return true;
    }

    private playNew(mediaUrl: string, resolve: Function): this {
        const newPlayer = this.players[this.currentPlayerType].cloneNode(true);
        newPlayer.src = mediaUrl;

        const appendAndPlay = () => {
            this.remove();
            this.container.appendChild(newPlayer);
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

    public remove(): this {
        this.container.innerHTML = "";
        return this;
    }
}

export default Player;
