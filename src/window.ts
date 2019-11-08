import { BrowserWindow } from "electron";

export function toggleWindowVisibility(win: BrowserWindow) {
    if (win.isVisible()) {
        win.hide();
    } else {
        win.show();
    }
}
