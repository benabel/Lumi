import electron from 'electron';
import nucleus from 'nucleus-nodejs';
import SocketIO from 'socket.io';

export default (window: electron.BrowserWindow, websocket: SocketIO.Server) => [
    {
        label: 'File',
        submenu: [
            {
                accelerator: 'CmdOrCtrl+N',
                click: () => {
                    nucleus.track('menu/click/new_h5p');
                    websocket.emit('action', {
                        payload: {
                            contentId: Math.round(Math.random() * 100000)
                        },
                        type: 'NEW_H5P'
                    });
                },
                label: 'New H5P'
            },
            { type: 'separator' } as any,
            {
                accelerator: 'CmdOrCtrl+O',
                click: () => {
                    electron.dialog
                        .showOpenDialog({
                            filters: [
                                {
                                    extensions: ['h5p'],
                                    name: 'HTML 5 Package'
                                }
                            ],
                            properties: ['openFile', 'multiSelections']
                        })
                        .then(({ filePaths }) => {
                            nucleus.track('menu/click/open_folder');
                            websocket.emit('action', {
                                payload: {
                                    paths: filePaths
                                },
                                type: 'OPEN_H5P'
                            });
                        });
                },
                label: 'Open H5P'
            },
            { type: 'separator' } as any,
            {
                accelerator: 'CmdOrCtrl+S',
                click: () => {
                    nucleus.track('menu/click/save');
                    websocket.emit('action', {
                        type: 'SAVE'
                    });
                },
                label: 'Save'
            },
            {
                accelerator: 'Shift+CmdOrCtrl+S',
                click: () => {
                    nucleus.track('menu/click/save_as');
                    websocket.emit('action', {
                        type: 'SAVE_AS'
                    });
                },
                label: 'Save as...'
            },
            { type: 'separator' } as any,
            {
                role: 'quit'
            } as any
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            },
            {
                label: 'Redo',
                accelerator:
                    process.platform !== 'darwin'
                        ? 'CmdOrCtrl+Y'
                        : 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectAll'
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                click: () => {
                    nucleus.track('menu/click/report_issue');
                    websocket.emit('action', {
                        type: 'REPORT_ISSUE'
                    });
                },
                label: 'Report Issue'
            },
            { type: 'separator' } as any,
            {
                click: () => {
                    nucleus.track('menu/click/open_devtools');
                    window.webContents.openDevTools();
                },
                label: 'Toggle Developer Tools'
            },
            { type: 'separator' } as any,
            {
                click: () => {
                    nucleus.track('menu/click/open_twitter');
                    electron.shell.openExternal(
                        'https://www.twitter.com/Lumieducation'
                    );
                },
                label: 'Follow Us on Twitter'
            },
            // { label: 'Check for Updates...', click: updater },
            { role: 'about' }
        ]
    }
];
