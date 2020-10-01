class Player {
    private players: any;
    private currentMediaExt: string;
    private container: HTMLElement;
    private extensions: { image: string[]; video: string[]; };
    private currentPlayer: any //HTMLVideoElement | HTMLImageElement | null;
    public currentDisplayedMedia: number | null;
    static default: typeof Player;
    constructor(container: HTMLElement | null) {
        if (!container) {
            throw new Error("You need to specify a valid container.");
        }
        this.container = container;
        this.extensions = {
            image: ["jpg", "png"],
            video: ["mp4"],
        }
        this.players = {
            video: this.createPlayer("video"),
            image: this.createPlayer("image"),
        }
        this.currentMediaExt = "";
        this.currentPlayer = null;
        this.currentDisplayedMedia = null;
    }

    _findPlayerByExt(ext: string): string | undefined {
        for (const [key, extensions] of Object.entries(this.extensions)) {
            if (extensions.includes(ext)) return key;
        }
        return void 0;
    }

    createPlayer(type: mediaTypes): HTMLElement {
        switch (type) {
            case "video": {
                const player  = document.createElement("video");
                player.setAttribute("loop", "loop");
                player.setAttribute("muted", "muted");
                return player;
            }
            case "image": {
                return document.createElement("img");
            }
        }
    }

    update(mediaUrl: string) {
        const ext = mediaUrl.split(".").pop() || "";
        if (ext === this.currentMediaExt) {
            this.playNew(mediaUrl);
            return;
        }
        this.remove();
        this.switchPlayer(ext, mediaUrl);
    }

    switchPlayer(ext: string, mediaUrl: string) {
        const playerType = this._findPlayerByExt(ext);
        if (!playerType) throw new Error(`${ext} isn't a supported file type.`);
        this.currentMediaExt = ext;
        this.currentPlayer = this.players[playerType].cloneNode(true);

        this.container.innerHTML = "";
        this.container.appendChild(this.currentPlayer);
        this.playNew(mediaUrl);
    }

    playNew(mediaUrl: string) {
        this.currentPlayer.src = mediaUrl;

        switch (this.currentPlayer.tagName) {
            case "VIDEO": {
                this.currentPlayer.addEventListener("canplay", () => this.currentPlayer.play());
            }
        }
    }

    remove() {
        if (!this.currentPlayer) return;
        this.currentMediaExt = "";
        this.currentPlayer.remove();
    }
}

export default Player;
