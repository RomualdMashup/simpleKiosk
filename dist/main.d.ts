declare class Main {
    private libOptions;
    private player;
    private ws;
    private medias;
    private afkMsg;
    private isAfk;
    private afkTimer;
    private afkElapsedTime;
    constructor(medias: string[], options: any);
    private createAfkTitle;
    private setBaseCss;
    private handleWS;
    setBackground(): this;
    setAfkScreen(): this;
}
export default Main;
