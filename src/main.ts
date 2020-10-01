import KioskPlayer from "./Player.js";

const medias = [
    "https://w.wallhaven.cc/full/ox/wallhaven-oxzk8m.jpg",
    "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4",
];

class Main {
    private libOptions: any;
    private player: KioskPlayer;
    private ws: WebSocket;
    constructor(options?: any) {
        this.libOptions = {
            wsPort: 8080,
        };
        Object.assign(this.libOptions, options);
        this.player = new KioskPlayer(this.libOptions.container);
        this.ws = new WebSocket(`ws://localhost:${this.libOptions.wsPort}`);
        this.handleWS();
        this.setBackground();
    }

    private handleWS() {
        this.ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            switch (msg.eventType) {
                case "add":
                    this.player.update(medias[msg.id]).then(() => {
                        this.player.setCurrentMediaId(msg.id);
                    }).catch((err) => {
                        throw err;
                    });
                    break;
                case "remove":
                    console.log(this.player.getCurrentMediaId(), msg.id)
                    if (this.player.getCurrentMediaId() === msg.id) this.player.remove();
                    break;
            }
        };
    }

    public setBackground() {
        document.body.style.backgroundSize = "100%";
        if (this.libOptions.backgroundImage) {
            document.body.style.backgroundColor = "";
            document.body.style.backgroundImage = `url(${this.libOptions.backgroundImage})`;
            return;
        } 
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "black";
    }
}

export default Main;
