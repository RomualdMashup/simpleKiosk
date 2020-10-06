import KioskPlayer from "./Player.js";
import { getMediaTypeByUrl } from './helpers.js';
import { videoBackground } from './Components.js';

class Main {
    private libOptions: any;
    private player: KioskPlayer;
    private ws: WebSocket;
    private medias: string[];
    private afkMsg: HTMLHeadingElement;
    private isAfk: boolean;
    private afkTimer: any;
    private afkElapsedTime: number;
    constructor(medias: string[], options: any) {
        this.medias = medias;
        this.libOptions = {
            wsAddress: "ws://localhost:8080",
        };
        Object.assign(this.libOptions, options);
        this.player = new KioskPlayer(this.libOptions);
        this.ws = new WebSocket(this.libOptions.wsAddress);
        this.afkMsg = this.createAfkTitle();
        this.isAfk = true;
        this.afkElapsedTime = 0;
        this.afkTimer = setInterval(() => {
            this.afkElapsedTime++;
            if (this.afkElapsedTime >= 20 && !this.isAfk) {
                this.setAfkScreen();
            }
        }, 1000);
        this.handleWS();
        this.setBaseCss();
        this.setBackground();
        this.setAfkScreen();
    }

    private createAfkTitle(): HTMLHeadingElement {
        const el =  document.createElement("h1");
        el.style.textAlign = "center";
        el.style.paddingTop = "30vh";
        el.style.color = "white";
        el.style.margin = "0";
        el.style.transition = "opacity 0.15s linear";
        el.style.cursor = "default";
        el.textContent = "Cliquer pour commencer";
        return el;
    }

    private setBaseCss() {
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
    }

    private handleWS(): void {
        this.ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            switch (msg.eventType) {
                case "add":
                    this.player.update(this.medias[msg.id]).then(() => {
                        this.player.setCurrentMediaId(msg.id);
                    }).catch((err) => {
                        throw err;
                    });
                    break;
                case "remove":
                    if (this.player.getCurrentMediaId() === msg.id) this.player.remove();
                    break;
            }
        };
    }

    public setBackground(): this {
        document.body.style.backgroundSize = "100%";
        if (this.libOptions.backgroundMedia) {
            const bgType = getMediaTypeByUrl(this.libOptions.backgroundMedia);
            console.log(bgType)
            if (bgType === "image") {
                document.body.style.backgroundImage = `url(${this.libOptions.backgroundMedia})`;
            } else if (bgType === "video") {
                const videoBg = videoBackground(this.libOptions.backgroundMedia);
                document.body.appendChild(videoBg);
            }
            return this;
        } 

        document.body.style.backgroundColor = "black";
        return this;
    }

    public setAfkScreen(): this {
        document.body.appendChild(this.afkMsg);
        document.body.style.boxShadow = `inset 0px 0px  100px ${window.innerWidth}px rgba(0,0,0,0.60)`;
        document.body.style.transition = "box-shadow 0.25s linear";
        this.afkMsg.style.opacity = "1";
        document.addEventListener("mousedown", () => {
            this.afkMsg.style.opacity = "0";
            document.body.style.boxShadow = `inset 0px 0px  100px ${window.innerWidth}px rgba(0,0,0,0)`;
            this.isAfk = false;
            this.afkElapsedTime = 0;
        })
        return this;
    }
}

export default Main;
