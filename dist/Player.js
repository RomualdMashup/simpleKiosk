var allowedExts = {
    image: ["jpg", "png"],
    video: ["mp4"],
};
var playerStyle = {
    position: "fixed",
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -100,
    objectFit: "contain",
};
var Player = /** @class */ (function () {
    function Player(options) {
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
    }
    Player.prototype._findPlayerByExt = function (ext) {
        for (var _i = 0, _a = Object.entries(allowedExts); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], extensions = _b[1];
            if (extensions.includes(ext))
                return key;
        }
        return void 0;
    };
    Player.prototype.setCurrentMediaId = function (id) {
        this.currentMediaId = id;
        return this;
    };
    Player.prototype.getCurrentMediaId = function () {
        return this.currentMediaId;
    };
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
    Player.prototype.switchPlayerType = function (ext) {
        var playerType = this._findPlayerByExt(ext);
        if (!playerType)
            return new Error(ext + " isn't a supported file type.");
        this.currentMediaExt = ext;
        this.currentPlayerType = playerType;
        return true;
    };
    Player.prototype.playNew = function (mediaUrl, resolve) {
        var _this = this;
        var newPlayer = this.players[this.currentPlayerType].cloneNode(true);
        newPlayer.src = mediaUrl;
        var appendAndPlay = function () {
            _this.remove();
            _this.container.appendChild(newPlayer);
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
    Player.prototype.remove = function () {
        this.container.innerHTML = "";
        return this;
    };
    return Player;
}());
export default Player;
