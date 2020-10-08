declare class Main {
    private libOptions;
    private player;
    private ws;
    private afkMsg;
    private isAfk;
    private afkElapsedTime;
    private backgroundElement;
    constructor(options: any);
    /**
     * sets the base css for the document
     */
    private setBaseCss;
    /**
     * Handles the evnts sent by mashupOSC and updates the player
     */
    private handleWS;
    /**
     * code executed after the player initialization
     */
    private nextCallstackTasks;
    /**
     * Sets the document background, as specified in the options.
     */
    setBackground(): this;
    /**
     * Hides the background element.
     */
    hideBackground(): this;
    /**
     * Shows the background element.
     */
    showBackground(): this;
    /**
     * Shows the screensaver screen.
     */
    setAfkScreen(): this;
}
export default Main;
