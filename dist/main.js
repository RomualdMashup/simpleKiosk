import KioskPlayer from "./Player.js";
import { afkTimeout } from "./_GLOBALS.js";
import { getMediaTypeByUrl } from "./helpers.js";
import { videoBackground, imageBackground, afkTitle } from "./Components.js";
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
        this.afkMsg = afkTitle();
        this.isAfk = true;
        this.afkElapsedTime = 0;
        this.backgroundElement = null;
        // @ts-ignore
        this.Micromodal = window.MicroModal;
        this.Micromodal.init();
        setInterval(function () {
            _this.afkElapsedTime++;
            if (_this.afkElapsedTime >= afkTimeout && !_this.isAfk) {
                _this.setAfkScreen();
            }
        }, 1000);
        this.handleWS();
        this.setBaseCss();
        this.setBackground();
        this.setAfkScreen();
        this.nextCallstackTasks();
    }
    Main.prototype.setBaseCss = function () {
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.overflow = "hidden";
        this.libOptions.container.style.zIndex = "1";
        this.libOptions.container.style.position = "absolute";
    };
    Main.prototype.handleWS = function () {
        var _this = this;
        this.ws.onmessage = function (event) {
            _this.afkElapsedTime = 0;
            if (_this.isAfk)
                return;
            var msg = JSON.parse(event.data);
            switch (msg.eventType) {
                case "add":
                    _this.player
                        .update(_this.medias[msg.id])
                        .then(function () {
                        _this.player.setCurrentMediaId(msg.id);
                        _this.hideBackground();
                    })
                        .catch(function (err) {
                        throw err;
                    });
                    break;
                case "remove":
                    if (_this.player.getCurrentMediaId() === msg.id) {
                        _this.player.remove();
                        _this.showBackground();
                    }
                    break;
            }
            _this.checkForModals(msg.id, msg.eventType);
        };
    };
    Main.prototype.nextCallstackTasks = function () {
        setTimeout(function () {
            // pour ne pas avoir l'effet de la transition css au démarrage de la page
            document.body.style.transition = "box-shadow 0.25s linear";
        }, 0);
    };
    Main.prototype.checkForModals = function (id, state) {
        var options = this.libOptions.modals;
        var modal = options.find(function (m) { return m.mediaId === id; });
        if (modal) {
            if (state === "add") {
                this.currentlyShownModal = modal.modalDomId;
                this.Micromodal.show(this.currentlyShownModal);
            }
            else if (state === "remove") {
                this.Micromodal.close(this.currentlyShownModal);
            }
            this.currentlyShownModal = "";
        }
        return this;
    };
    Main.prototype.setBackground = function () {
        document.body.style.backgroundSize = "100%";
        if (this.libOptions.backgroundMedia) {
            var bgType = getMediaTypeByUrl(this.libOptions.backgroundMedia);
            var possibleTypes = {
                image: imageBackground,
                video: videoBackground,
            };
            var bgEl = possibleTypes[bgType || "image"](this.libOptions.backgroundMedia);
            this.backgroundElement = bgEl;
            document.body.appendChild(bgEl);
        }
        document.body.style.backgroundColor = "black";
        return this;
    };
    Main.prototype.hideBackground = function () {
        if (this.backgroundElement)
            this.backgroundElement.style.display = "none";
        return this;
    };
    Main.prototype.showBackground = function () {
        if (this.backgroundElement)
            this.backgroundElement.style.display = "block";
        return this;
    };
    Main.prototype.setAfkScreen = function () {
        var _this = this;
        document.body.appendChild(this.afkMsg);
        document.body.style.boxShadow = "inset 0px 0px  100px " + window.innerWidth + "px rgba(0,0,0,0.60)";
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
