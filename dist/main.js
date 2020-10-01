import KioskPlayer from "./Player.js";
var medias = [
    "https://w.wallhaven.cc/full/ox/wallhaven-oxzk8m.jpg",
    "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4",
];
var Main = /** @class */ (function () {
    function Main(options) {
        this.libOptions = {
            wsPort: 8080,
        };
        Object.assign(this.libOptions, options);
        this.player = new KioskPlayer(this.libOptions.container);
        this.ws = new WebSocket("ws://localhost:" + this.libOptions.wsPort);
        this.handleWS();
        this.setBackground();
    }
    Main.prototype.handleWS = function () {
        var _this = this;
        this.ws.onmessage = function (event) {
            var msg = JSON.parse(event.data);
            switch (msg.eventType) {
                case "add":
                    _this.player.update(medias[msg.id]).then(function () {
                        _this.player.setCurrentMediaId(msg.id);
                    }).catch(function (err) {
                        throw err;
                    });
                    break;
                case "remove":
                    console.log(_this.player.getCurrentMediaId(), msg.id);
                    if (_this.player.getCurrentMediaId() === msg.id)
                        _this.player.remove();
                    break;
            }
        };
    };
    Main.prototype.setBackground = function () {
        document.body.style.backgroundSize = "100%";
        if (this.libOptions.backgroundImage) {
            document.body.style.backgroundColor = "";
            document.body.style.backgroundImage = "url(" + this.libOptions.backgroundImage + ")";
            return;
        }
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "black";
    };
    return Main;
}());
export default Main;
