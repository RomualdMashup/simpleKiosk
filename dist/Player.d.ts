/**
 * Method starting with "_" : helper
 */
declare class Player {
    private players;
    private currentMediaExt;
    private container;
    private currentMediaId;
    private currentPlayerType;
    private options;
    private loaderStartTimeout;
    private loaderEl;
    constructor(options: any);
    /**
     * Finds the right player for the input file extension
     *
     * @param ext
     */
    private _findPlayerByExt;
    /**
     * Once the loading is complete, sets the current id of the card displaying the last media
     *
     * @param id
     */
    setCurrentMediaId(id: number): this;
    getCurrentMediaId(): number | null;
    /**
     * Creates a dom elements able to display the current media
     * <img> for images, <video> for videos
     *
     * @param type
     */
    private createPlayer;
    /**
     * updates the player when a new card has been placed
     *
     * @param mediaUrl
     */
    update(mediaUrl: string): Promise<any>;
    /**
     * switches the type of player if a new media required a different one has to be displayed
     *
     * @param ext
     */
    private switchPlayerType;
    /**
     * plays the new media appending the new tag to the dom,
     * also sets up a loader which displays when a media takes more than the specified amount of time to load
     * see loaderStart in _GLOBALS_
     *
     * @param mediaUrl
     * @param resolve
     */
    private playNew;
    /**
     * toggle the loader on and off
     *
     * @param state
     */
    toggleLoader(state: "on" | "off"): void;
    /**
     * remove the current player from his container
     */
    remove(): this;
}
export default Player;
