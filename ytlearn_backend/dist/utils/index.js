"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checklink = checklink;
function checklink(link) {
    if (link.includes("youtube.com") || link.includes("youtu.be")) {
        return true;
    }
    else {
        return false;
    }
}
