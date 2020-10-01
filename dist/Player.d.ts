declare class Player {
    private players;
    private currentMediaExt;
    private container;
    private extensions;
    private currentPlayer;
    private currentMediaId;
    static default: typeof Player;
    constructor(container: HTMLElement | null);
    private _findPlayerByExt;
    setCurrentMediaId(id: number): this;
    getCurrentMediaId(): number | null;
    private createPlayer;
    update(mediaUrl: string): Promise<unknown>;
    private switchPlayer;
    private playNew;
    remove(): void;
}
export default Player;
