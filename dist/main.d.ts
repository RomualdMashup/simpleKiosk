import KioskPlayer from "./Player.js";
declare class Main {
    libOptions: any;
    player: KioskPlayer;
    ws: WebSocket;
    constructor(options?: any);
    private handleWS;
    setBackground(): void;
}
export default Main;
