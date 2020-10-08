import { allowedExts, loaderStart } from './_GLOBALS.js';
import { loader } from './Components.js';
var playerStyle = {
    position: "fixed",
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -100,
    objectFit: "contain",
};
/**
 * Method starting with "_" : helper
 */
var Player = /** @class */ (function () {
    function Player(options) {
        console.log(options);
        if (!options.container) {
            throw new Error("You need to specify a valid container.");
        }
        this.options = options;
        this.container = options.container;
        this.players = {
            video: this.createPlayer("video"),
            image: this.createPlayer("image"),
        };
        this.currentMediaExt = "";
        this.currentMediaId = null;
        this.currentPlayerType = null;
        this.loaderStartTimeout = null;
        this.loaderEl = loader();
        this.toggleLoader("off");
    }
    /**
     * Finds the right player for the input file extension
     *
     * @param ext
     */
    Player.prototype._findPlayerByExt = function (ext) {
        for (var _i = 0, _a = Object.entries(allowedExts); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], extensions = _b[1];
            if (extensions.includes(ext))
                return key;
        }
        return void 0;
    };
    /**
     * Once the loading is complete, sets the current id of the card displaying the last media
     *
     * @param id
     */
    Player.prototype.setCurrentMediaId = function (id) {
        this.currentMediaId = id;
        return this;
    };
    Player.prototype.getCurrentMediaId = function () {
        return this.currentMediaId;
    };
    /**
     * Creates a dom elements able to display the current media
     * <img> for images, <video> for videos
     *
     * @param type
     */
    Player.prototype.createPlayer = function (type) {
        switch (type) {
            case "video": {
                var player = document.createElement("video");
                var videoOptions = this.options.video;
                if (videoOptions.loop)
                    player.setAttribute("loop", "");
                if (videoOptions.mute)
                    player.setAttribute("muted", "");
                player.setAttribute("autoplay", "");
                Object.assign(player.style, playerStyle);
                return player;
            }
            case "image": {
                var player = document.createElement("img");
                Object.assign(player.style, playerStyle);
                return player;
            }
        }
    };
    /**
     * updates the player when a new card has been placed
     *
     * @param mediaUrl
     */
    Player.prototype.update = function (mediaUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var ext = mediaUrl.split(".").pop() || "";
            if (ext === _this.currentMediaExt) {
                _this.playNew(mediaUrl, resolve);
                return;
            }
            var isSwitched = _this.switchPlayerType(ext);
            if (isSwitched !== true) {
                reject(isSwitched);
                return;
            }
            _this.playNew(mediaUrl, resolve);
        });
    };
    /**
     * switches the type of player if a new media required a different one has to be displayed
     *
     * @param ext
     */
    Player.prototype.switchPlayerType = function (ext) {
        var playerType = this._findPlayerByExt(ext);
        if (!playerType)
            return new Error(ext + " isn't a supported file type.");
        this.currentMediaExt = ext;
        this.currentPlayerType = playerType;
        return true;
    };
    /**
     * plays the new media appending the new tag to the dom,
     * also sets up a loader which displays when a media takes more than the specified amount of time to load
     * see loaderStart in _GLOBALS_
     *
     * @param mediaUrl
     * @param resolve
     */
    Player.prototype.playNew = function (mediaUrl, resolve) {
        var _this = this;
        var newPlayer = this.players[this.currentPlayerType].cloneNode(true);
        newPlayer.src = mediaUrl;
        clearTimeout(this.loaderStartTimeout);
        this.loaderStartTimeout = setTimeout(function () {
            _this.toggleLoader("on");
        }, loaderStart * 1000);
        var appendAndPlay = function () {
            clearTimeout(_this.loaderStartTimeout);
            _this.remove();
            _this.container.appendChild(newPlayer);
            _this.toggleLoader("off");
            resolve();
        };
        switch (newPlayer.tagName) {
            case "VIDEO": {
                newPlayer.addEventListener("canplay", appendAndPlay);
            }
            case "IMG": {
                newPlayer.addEventListener("load", appendAndPlay);
            }
        }
        return this;
    };
    /**
     * toggle the loader on and off
     *
     * @param state
     */
    Player.prototype.toggleLoader = function (state) {
        var _this = this;
        var cases = {
            on: function () {
                document.body.appendChild(_this.loaderEl);
            },
            off: function () {
                _this.loaderEl.remove();
            }
        };
        cases[state]();
    };
    /**
     * remove the current player from his container
     */
    Player.prototype.remove = function () {
        this.container.innerHTML = "";
        return this;
    };
    return Player;
}());
export default Player;
