declare class Main {
    private libOptions;
    private player;
    private ws;
    private medias;
    private afkMsg;
    private isAfk;
    private afkElapsedTime;
    private backgroundElement;
    constructor(medias: string[], options: any);
    private setBaseCss;
    private handleWS;
    private nextCallstackTasks;
    setBackground(): this;
    hideBackground(): this;
    showBackground(): this;
    setAfkScreen(): this;
}
export default Main;
