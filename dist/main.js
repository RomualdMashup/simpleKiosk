import KioskPlayer from "./Player.js";
import { afkTimeout } from "./_GLOBALS.js";
import { getMediaTypeByUrl } from "./helpers.js";
import { videoBackground, imageBackground, afkTitle } from "./Components.js";
var Main = /** @class */ (function () {
    function Main(options) {
        var _this = this;
        // default options
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
    /**
     * sets the base css for the document
     */
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
        return this;
    };
    /**
     * Handles the evnts sent by mashupOSC and updates the player
     */
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
                        .update(msg.mediaUrl)
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
        };
    };
    /**
     * code executed after the player initialization
     */
    Main.prototype.nextCallstackTasks = function () {
        setTimeout(function () {
            // Sets the transition property after the player is initialized so we don't see the first transition to the screensaver.
            document.body.style.transition = "box-shadow 0.25s linear";
        }, 0);
        return this;
    };
    /**
     * Sets the document background, as specified in the options.
     */
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
    /**
     * Hides the background element.
     */
    Main.prototype.hideBackground = function () {
        if (this.backgroundElement)
            this.backgroundElement.style.display = "none";
        return this;
    };
    /**
     * Shows the background element.
     */
    Main.prototype.showBackground = function () {
        if (this.backgroundElement)
            this.backgroundElement.style.display = "block";
        return this;
    };
    /**
     * Shows the screensaver screen.
     */
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
