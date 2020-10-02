declare class Main {
    private libOptions;
    private player;
    private ws;
    private medias;
    constructor(medias: string[], options: any);
    private handleWS;
    setBackground(): this;
}
export default Main;
