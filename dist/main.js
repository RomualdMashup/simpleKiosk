import KioskPlayer from "./Player.js";
var Main = /** @class */ (function () {
    function Main(medias, options) {
        this.medias = medias;
        this.libOptions = {
            wsAddress: "ws://localhost:8080",
        };
        Object.assign(this.libOptions, options);
        this.player = new KioskPlayer(this.libOptions);
        this.ws = new WebSocket(this.libOptions.wsAddress);
        this.handleWS();
        this.setBackground();
    }
    Main.prototype.handleWS = function () {
        var _this = this;
        this.ws.onmessage = function (event) {
            var msg = JSON.parse(event.data);
            switch (msg.eventType) {
                case "add":
                    _this.player.update(_this.medias[msg.id]).then(function () {
                        _this.player.setCurrentMediaId(msg.id);
                    }).catch(function (err) {
                        throw err;
                    });
                    break;
                case "remove":
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
            return this;
        }
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "black";
        return this;
    };
    return Main;
}());
export default Main;
