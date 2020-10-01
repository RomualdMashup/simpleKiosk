declare class Player {
    private players;
    private currentMediaExt;
    private container;
    private extensions;
    private currentPlayer;
    currentDisplayedMedia: number | null;
    static default: typeof Player;
    constructor(container: HTMLElement | null);
    _findPlayerByExt(ext: string): string | undefined;
    createPlayer(type: mediaTypes): HTMLElement;
    update(mediaUrl: string): void;
    switchPlayer(ext: string, mediaUrl: string): void;
    playNew(mediaUrl: string): void;
    remove(): void;
}
export default Player;
