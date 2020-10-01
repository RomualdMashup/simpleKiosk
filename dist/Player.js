var Player = /** @class */ (function () {
    function Player(container) {
        if (!container) {
            throw new Error("You need to specify a valid container.");
        }
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
        this.currentDisplayedMedia = null;
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
                player.setAttribute("loop", "loop");
                player.setAttribute("muted", "muted");
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
        this.remove();
        this.switchPlayer(ext, mediaUrl);
    };
    Player.prototype.switchPlayer = function (ext, mediaUrl) {
        var playerType = this._findPlayerByExt(ext);
        if (!playerType)
            throw new Error(ext + " isn't a supported file type.");
        this.currentMediaExt = ext;
        this.currentPlayer = this.players[playerType].cloneNode(true);
        this.container.innerHTML = "";
        this.container.appendChild(this.currentPlayer);
        this.playNew(mediaUrl);
    };
    Player.prototype.playNew = function (mediaUrl) {
        var _this = this;
        this.currentPlayer.src = mediaUrl;
        switch (this.currentPlayer.tagName) {
            case "VIDEO": {
                this.currentPlayer.addEventListener("canplay", function () { return _this.currentPlayer.play(); });
            }
        }
    };
    Player.prototype.remove = function () {
        if (!this.currentPlayer)
            return;
        this.currentMediaExt = "";
        this.currentPlayer.remove();
    };
    return Player;
}());
export default Player;
