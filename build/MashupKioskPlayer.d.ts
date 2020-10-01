declare module "Player" {
    class Player {
        players: any;
        currentMediaExt: string;
        container: HTMLElement;
        extensions: {
            image: string[];
            video: string[];
        };
        currentPlayer: any;
        static default: typeof Player;
        constructor(container: HTMLElement);
        _findPlayerByExt(ext: string): string | undefined;
        createPlayer(type: "video" | "image"): HTMLElement;
        update(mediaUrl: string): void;
        switchPlayer(ext: string, mediaUrl: string): void;
        playNew(mediaUrl: string): void;
    }
    export = Player;
}
declare module "main" { }
