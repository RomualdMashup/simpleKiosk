import KioskPlayer from "./Player.js";
import { afkTimeout } from "./_GLOBALS.js";
import { getMediaTypeByUrl } from "./helpers.js";
import { videoBackground, imageBackground, afkTitle } from "./Components.js";

class Main {
    private libOptions: any;
    private player: KioskPlayer;
    private ws: WebSocket;
    private medias: string[];
    private afkMsg: HTMLHeadingElement;
    private isAfk: boolean;
    private afkElapsedTime: number;
    private backgroundElement: HTMLElement | null;
    private Micromodal: any;
    currentlyShownModal: any;
    constructor(medias: string[], options: any) {
        this.medias = medias;
        this.libOptions = {
            wsAddress: "ws://localhost:8080",
        };
        Object.assign(this.libOptions, options);
        this.player = new KioskPlayer(this.libOptions);
        this.ws = new WebSocket(this.libOptions.wsAddress);
        this.afkMsg = afkTitle();
        this.isAfk = true;
        this.afkElapsedTime = 0;
        this.backgroundElement = null;
        // @ts-ignore
        this.Micromodal = window.MicroModal;
        this.Micromodal.init();
        setInterval(() => {
            this.afkElapsedTime++;
            if (this.afkElapsedTime >= afkTimeout && !this.isAfk) {
                this.setAfkScreen();
            }
        }, 1000);
        this.handleWS();
        this.setBaseCss();
        this.setBackground();
        this.setAfkScreen();
        this.nextCallstackTasks();
    }

    private setBaseCss() {
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.overflow = "hidden";
        this.libOptions.container.style.zIndex = "1";
        this.libOptions.container.style.position = "absolute";
    }

    private handleWS(): void {
        this.ws.onmessage = (event) => {
            this.afkElapsedTime = 0;
            if (this.isAfk) return;
            const msg = JSON.parse(event.data);
            switch (msg.eventType) {
                case "add":
                    this.player
                        .update(this.medias[msg.id])
                        .then(() => {
                            this.player.setCurrentMediaId(msg.id);
                            this.hideBackground();
                        })
                        .catch((err) => {
                            throw err;
                        });
                    break;
                case "remove":
                    if (this.player.getCurrentMediaId() === msg.id) {
                        this.player.remove();
                        this.showBackground();
                    } 
                    break;
            }
            this.checkForModals(msg.id, msg.eventType);
        };
    }

    private nextCallstackTasks(): void {
        setTimeout(() => {
            // pour ne pas avoir l'effet de la transition css au démarrage de la page
            document.body.style.transition = "box-shadow 0.25s linear";
        }, 0);
    }

    private checkForModals(id: number, state: "add" | "remove"): this {
        const options = this.libOptions.modals;
        const modal = options.find((m: any) => m.mediaId === id);
        if (modal) {
            if (state === "add") {
                this.currentlyShownModal = modal.modalDomId;
                this.Micromodal.show(this.currentlyShownModal);
            } else if (state === "remove") {
                this.Micromodal.close(this.currentlyShownModal);
            }
            this.currentlyShownModal = "";
        }
        return this;
    }

    public setBackground(): this {
        document.body.style.backgroundSize = "100%";
        if (this.libOptions.backgroundMedia) {
            const bgType: string | false = getMediaTypeByUrl(this.libOptions.backgroundMedia);
            const possibleTypes = {
                image: imageBackground,
                video: videoBackground,
            } as any;
            const bgEl = possibleTypes[bgType || "image"](this.libOptions.backgroundMedia);
            this.backgroundElement = bgEl;
            document.body.appendChild(bgEl);
        }
        document.body.style.backgroundColor = "black";
        return this;
    }

    public hideBackground(): this {
        if(this.backgroundElement) this.backgroundElement.style.display = "none";
        return this;
    }

    public showBackground(): this {
        if(this.backgroundElement) this.backgroundElement.style.display = "block";
        return this;
    }

    public setAfkScreen(): this {
        document.body.appendChild(this.afkMsg);
        document.body.style.boxShadow = `inset 0px 0px  100px ${window.innerWidth}px rgba(0,0,0,0.60)`;
        this.afkMsg.style.opacity = "1";
        document.addEventListener("mousedown", () => {
            this.afkMsg.style.opacity = "0";
            document.body.style.boxShadow = `inset 0px 0px  100px ${window.innerWidth}px rgba(0,0,0,0)`;
            this.isAfk = false;
            this.afkElapsedTime = 0;
        });
        return this;
    }
}

export default Main;
