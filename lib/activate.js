import { Menu } from '@lumino/widgets';
import { maapLogin, loadMaapEnvironment } from './funcs';
import { Token } from '@lumino/coreutils';
const idMaapProfile = 'maap-help-extension:IMaapProfile';
const IMaapProfile = new Token(idMaapProfile);
let maapEnvironment = {};
class MaapProfile {
}
const login_command = 'maapsec_login_command';
var loginWindow;
var _state;
export function activateLogin(app, palette, state) {
    _state = state;
    const maapProfile = new MaapProfile();
    var lbl = 'Login';
    loadMaapEnvironment().then((env_result) => {
        console.log("Loaded maap env");
        console.log(env_result);
        maapEnvironment = env_result;
    });
    app.commands.addCommand(login_command, {
        label: lbl,
        isEnabled: () => true,
        execute: args => {
            console.log("testing...");
            console.log(maapEnvironment);
            var url = 'https://' + maapEnvironment['auth_server'] + '/cas/login?service=' + encodeURIComponent(window.location.href.split('?')[0]);
            var title = 'MAAP Login';
            const w = 800;
            const h = 750;
            var left = (screen.width / 2) - (w / 2);
            var top = (screen.height / 2) - (h / 2);
            loginWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
            //if (window.focus) loginWindow.focus();
            if (document.hasFocus() && loginWindow != null) {
                loginWindow.focus();
            }
            window.addEventListener('message', handleMessageDispatch);
        }
    });
    palette.addItem({ command: login_command, category: 'MAAP Profile' });
    console.log('MAAP Sec is activated');
    // Load the saved plugin state and apply it once the app
    // has finished restoring its former layout.
    Promise.all([state.fetch(idMaapProfile), app.restored])
        .then(([saved]) => {
        console.log('saved profile');
        console.log(saved);
    });
    return maapProfile;
}
function handleMessageDispatch(ev) {
    window.removeEventListener('message', handleMessageDispatch);
    let sTicket = ev.data;
    loginWindow.close();
    maapLogin(encodeURIComponent(window.location.href.split('?')[0]), sTicket)
        .then((login_result) => {
        console.log(login_result);
        _state.save(idMaapProfile, login_result);
    });
}
// add MAAP Profile options to Menu dropdown
export function activateMenuOptions(app, mainMenu) {
    const { commands } = app;
    let maapProfileMenu = new Menu({ commands });
    maapProfileMenu.id = 'maapsec';
    maapProfileMenu.title.label = 'MAAP Login';
    [
        login_command,
    ].forEach(command => {
        maapProfileMenu.addItem({ command });
    });
    mainMenu.addMenu(maapProfileMenu, { rank: 110 });
}
