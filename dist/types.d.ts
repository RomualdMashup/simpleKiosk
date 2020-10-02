declare type mediaTypes = "video" | "image";
interface allowedExts {
    image: string[];
    video: string[];
}
interface playerStyle {
    position: string;
    right: number;
    bottom: number;
    width: string;
    height: string;
    zIndex: number;
    objectFit: string;
}
