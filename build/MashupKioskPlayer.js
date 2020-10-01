"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("Player", ["require", "exports"], function (require, exports) {
    "use strict";
    var Player = /** @class */ (function () {
        function Player(container) {
            this.container = container;
            this.extensions = {
                image: ["jpg", "png"],
                video: ["mp4"],
            };
            this.players = {
                video: this.createPlayer("video"),
                image: this.createPlayer("image"),
            };
            this.currentMediaExt = "";
            this.currentPlayer = null;
        }
        Player.prototype._findPlayerByExt = function (ext) {
            for (var _i = 0, _a = Object.entries(this.extensions); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], extensions = _b[1];
                if (extensions.includes(ext))
                    return key;
            }
            return void 0;
        };
        Player.prototype.createPlayer = function (type) {
            switch (type) {
                case "video": {
                    var player = document.createElement("video");
                    player.loop = false;
                    player.muted = true;
                    return player;
                }
                case "image": {
                    return document.createElement("img");
                }
            }
        };
        Player.prototype.update = function (mediaUrl) {
            var ext = mediaUrl.split(".").pop() || "";
            if (ext === this.currentMediaExt) {
                this.playNew(mediaUrl);
                return;
            }
            this.switchPlayer(ext, mediaUrl);
        };
        Player.prototype.switchPlayer = function (ext, mediaUrl) {
            var playerType = this._findPlayerByExt(ext);
            if (!playerType)
                throw new Error(ext + " isn't a supported file type.");
            this.currentMediaExt = ext;
            this.currentPlayer = this.players[this.currentMediaExt];
            if (!this.currentPlayer)
                return;
            this.container.innerHTML = "";
            this.container.appendChild(this.currentPlayer);
            this.playNew(mediaUrl);
        };
        Player.prototype.playNew = function (mediaUrl) {
            var _this = this;
            if (!this.currentPlayer)
                return;
            this.currentPlayer.src = mediaUrl;
            switch (this.currentPlayer.tagName) {
                case "VIDEO": {
                    this.currentPlayer.addEventListener("canplay", function () { return _this.currentPlayer.play(); });
                }
            }
        };
        return Player;
    }());
    Player.default = Player;
    return Player;
});
define("main", ["require", "exports", "../build/MashupKioskPlayer.js"], function (require, exports, MashupKioskPlayer_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MashupKioskPlayer_js_1 = __importDefault(MashupKioskPlayer_js_1);
    var player = new MashupKioskPlayer_js_1.default(document.getElementById("player_container"));
});
