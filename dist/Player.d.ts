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
    private _findPlayerByExt;
    setCurrentMediaId(id: number): this;
    getCurrentMediaId(): number | null;
    private createPlayer;
    update(mediaUrl: string): Promise<any>;
    private switchPlayerType;
    private playNew;
    toggleLoader(state: "on" | "off"): void;
    remove(): this;
}
export default Player;
