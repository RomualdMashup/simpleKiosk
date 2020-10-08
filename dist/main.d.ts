declare class Main {
    private libOptions;
    private player;
    private ws;
    private medias;
    private afkMsg;
    private isAfk;
    private afkElapsedTime;
    private backgroundElement;
    private Micromodal;
    currentlyShownModal: any;
    constructor(medias: string[], options: any);
    private setBaseCss;
    private handleWS;
    private nextCallstackTasks;
    private checkForModals;
    setBackground(): this;
    hideBackground(): this;
    showBackground(): this;
    setAfkScreen(): this;
}
export default Main;
