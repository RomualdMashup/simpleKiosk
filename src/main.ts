import KioskPlayer from "./Player.js";

class Main {
    private libOptions: any;
    private player: KioskPlayer;
    private ws: WebSocket;
    private medias: string[];
    constructor(medias: string[], options: any) {
        this.medias = medias;
        this.libOptions = {
            wsAddress: "ws://localhost:8080",
        };
        Object.assign(this.libOptions, options);
        this.player = new KioskPlayer(this.libOptions);
        this.ws = new WebSocket(this.libOptions.wsAddress);
        this.handleWS();
        this.setBackground();
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
        if (this.libOptions.backgroundImage) {
            document.body.style.backgroundColor = "";
            document.body.style.backgroundImage = `url(${this.libOptions.backgroundImage})`;
            return this;
        } 
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "black";
        return this;
    }
}

export default Main;
