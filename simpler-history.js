
var openPage = function(page,args) {
    SH.history.open(page,args);

    SH.info.page = page;
    SH.info.pageArgs = args;

    console.log('do some logic for the page: '+page);
};

var SH = {};
SH.info = {
    page : '',
    pageArgs : [],
    domain : '',
    holdingDomain : '',
    lastPage: ''
};
SH.pages = {
    general : [],
    home : [],
    about : [],
    contact: [],
    my : [
        {
            sub: {
                subpage1 : [
                  
                ],
                subpage2 : [
                  
                ]
            }
        }
    ],
    pagenotfound : []
};

SH.loadPage = function(page,args) {
    console.log(page+' | '+args);
    if(typeof args == 'undefined') {
        args = ''
    }
    openPage(page,args);
};

// #### BEGIN PATROL LOGIC ####
SH.history = {};

SH.history.currentPage;
SH.history.currentPageArgs = [];

SH.history.pushState = false;
if (history.pushState) {
    SH.history.pushState = true;
}

SH.history.stop = false;

SH.history.open = function(name) {
    if(SH.history.pushState) {
        window.history.pushState('', name, "/"+name);
    } else {
        document.location.hash = '#!/' + name;
    }
};

SH.history.manage = function() {
    if(SH.history.pushState == true && document.location.hash.substr(0,3) !== '#!/') {
        var state = window.location.pathname;
        var fullState = '';
        if(state.substr(0,1) == '/') {
            state = state.substr(1);
        }
        fullState = state.split(':')[0];

        if(state !== null && state !== '' && state !== '/') {
            if(state.split(':')[1] !== 'undefined') {
                SH.history.currentPageArgs = [];
                SH.history.currentPageArgs.push(state.split(':')[1]);
            }

            state = state.split(':')[0];
            var subPageTest = state.split('/')[1], 
                args = state.split('/');
            state = state.split('/')[0];

            if(fullState !== SH.info.pageArgs.join('/')) {
                if(typeof SH.pages[state] !== 'undefined') {
                    if(typeof SH.pages[state][0] !== 'undefined' && typeof SH.pages[state][0].sub !== 'undefined') {
                        if(typeof SH.pages[state][0].sub[subPageTest] !== 'undefined') {
                            SH.info.page = state+'_'+subPageTest;
                            SH.loadPage(state+'_'+subPageTest,args);
                        } else {
                            if(typeof SH.pages[state] !== 'undefined') {
                                SH.loadPage(state,args);
                            } else {
                                SH.history.open('pagenotfound');
                            }
                        }
                    } else {
                        SH.loadPage(state,args);
                    }
                    SH.info.lastPage = SH.history.currentPage;
                    SH.history.currentPage = state;
                } else {
                    SH.history.open('pagenotfound');
                }
            }
        } else {
            SH.info.page = 'home';
            SH.history.open('home');
        }
    } else {
        var hash = document.location.hash;
        if(SH.history.pushState == true) {
            SH.history.open(hash.substr(3));
            return false;
        }
        if(hash.length > 1 && window.location.pathname == '/') {
            if(hash.substr(0,3) == '#!/') {
                hash = hash.substr(3).split('#')[0];
                if(hash.split(':')[1] !== 'undefined') {
                    SH.history.currentPageArgs = [];
                    SH.history.currentPageArgs.push(hash.split(':')[1])
                }
                hash = hash.split(':')[0];
                var subPageTest = hash.split('/')[1];
                hash = hash.split('/')[0];
                var args = document.location.hash.substr(3).split('/');
                if(document.location.hash.substr(3) !== SH.info.pageArgs.join('/')) {
                    if(typeof SH.pages[hash] !== 'undefined') {
                        if(typeof SH.pages[hash][0] !== 'undefined' && typeof SH.pages[hash][0].sub !== 'undefined') {
                            if(typeof SH.pages[hash][0].sub[subPageTest] !== 'undefined') {
                                SH.info.page = hash+'_'+subPageTest;
                                SH.loadPage(hash+'_'+subPageTest,args);
                            } else {
                                if(typeof SH.pages[hash] !== 'undefined') {
                                    SH.loadPage(hash,args);
                                } else {
                                    SH.history.open('pagenotfound');
                                }
                            }
                        } else {    
                            SH.loadPage(hash,args);
                        }
                        SH.info.lastPage = SH.history.currentPage;
                        SH.history.currentPage = hash;
                    } else {
                        SH.history.open('pagenotfound');    
                    }
                }
            }
        } else if(window.location.pathname !== '/') {
            SH.history.stop = true;
            window.location.assign( '/#!/' +window.location.pathname.substr(1));
        } else {
            SH.info.page = 'home';
            SH.history.open('home');
        }
    }
};

SH.history.patrol = function() {
    SH.history.manage();
    var run = setInterval(function() {
        if(SH.history.stop  == false) {
            SH.history.manage();
        }
    },200);
};

SH.history.patrol();