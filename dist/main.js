import KioskPlayer from "./Player.js";
import { getMediaTypeByUrl } from './helpers.js';
import { videoBackground } from './Components.js';
var Main = /** @class */ (function () {
    function Main(medias, options) {
        var _this = this;
        this.medias = medias;
        this.libOptions = {
            wsAddress: "ws://localhost:8080",
        };
        Object.assign(this.libOptions, options);
        this.player = new KioskPlayer(this.libOptions);
        this.ws = new WebSocket(this.libOptions.wsAddress);
        this.afkMsg = this.createAfkTitle();
        this.isAfk = true;
        this.afkElapsedTime = 0;
        this.afkTimer = setInterval(function () {
            _this.afkElapsedTime++;
            if (_this.afkElapsedTime >= 20 && !_this.isAfk) {
                _this.setAfkScreen();
            }
        }, 1000);
        this.handleWS();
        this.setBaseCss();
        this.setBackground();
        this.setAfkScreen();
    }
    Main.prototype.createAfkTitle = function () {
        var el = document.createElement("h1");
        el.style.textAlign = "center";
        el.style.paddingTop = "30vh";
        el.style.color = "white";
        el.style.margin = "0";
        el.style.transition = "opacity 0.15s linear";
        el.style.cursor = "default";
        el.textContent = "Cliquer pour commencer";
        return el;
    };
    Main.prototype.setBaseCss = function () {
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
    };
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
        if (this.libOptions.backgroundMedia) {
            var bgType = getMediaTypeByUrl(this.libOptions.backgroundMedia);
            console.log(bgType);
            if (bgType === "image") {
                document.body.style.backgroundImage = "url(" + this.libOptions.backgroundMedia + ")";
            }
            else if (bgType === "video") {
                var videoBg = videoBackground(this.libOptions.backgroundMedia);
                document.body.appendChild(videoBg);
            }
            return this;
        }
        document.body.style.backgroundColor = "black";
        return this;
    };
    Main.prototype.setAfkScreen = function () {
        var _this = this;
        document.body.appendChild(this.afkMsg);
        document.body.style.boxShadow = "inset 0px 0px  100px " + window.innerWidth + "px rgba(0,0,0,0.60)";
        document.body.style.transition = "box-shadow 0.25s linear";
        this.afkMsg.style.opacity = "1";
        document.addEventListener("mousedown", function () {
            _this.afkMsg.style.opacity = "0";
            document.body.style.boxShadow = "inset 0px 0px  100px " + window.innerWidth + "px rgba(0,0,0,0)";
            _this.isAfk = false;
            _this.afkElapsedTime = 0;
        });
        return this;
    };
    return Main;
}());
export default Main;
