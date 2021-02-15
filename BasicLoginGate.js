class BasicLoginGate {
    isHidden = !0;
    lastScrollTop = 0;
    widgetVisible = !1;
    isScrollDisabled = !1;
    htmlTemplate = `<div><style>#the__title{color: rgb(255, 255, 255); margin: 32px 0px 0px; font-size: 2.25rem; letter-spacing: 1.5px; line-height: 50.4px; font-family: TuskerGrotesk-6500Medium; width: 80%;}p{font-family: 'Lora', serif;}.tri__square::before, .tri__square::after{box-sizing: border-box; border-width: 1px; border-style: solid; color: rgb(24, 33, 58); content: ""; position: absolute; width: 100%; height: 100%; z-index: -1;}.tri__square::before{background-color: rgb(24, 33, 58); opacity: 70%; top: 5px; left: -5px;}.tri__square::after{background-color: rgb(24, 33, 58); opacity: 40%; top: 9px; left: -9px;} .fade-in {
        opacity: 1;
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: .1s;
    } @keyframes fadeInOpacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }</style>
    <div id="main__form" class="fade-in" style="width: 100%; margin: 0 auto; background-color: rgb(240, 79, 60); padding: 30px 20px 30px 20px; z-index: 1000; position: fixed; bottom: 0; display:block;">
       <div style="position: absolute; top: 20px;"><a href="https://www.rappler.com"><img src="https://assets2.rappler.com/2021/01/svgexport-12.png"/></a></div>
       <div style="position: absolute; right: 20px; top: 30px; font-size: 0.875rem; letter-spacing: 2px;line-height: 21px; font-family: TuskerGrotesk-6500Medium; margin: 0px; color: rgb(24, 33, 58);  text-transform: uppercase;"><span style="opacity: 70%;">Already a member? </span><a id="loginClick" style="cursor: pointer; color: rgb(24, 33, 58);"><strong><u>login</u></strong></a></div>
       <p id="the__title" class="dTDfwu" style="display: block; margin-top: 60px;">%%header%%<span style="color: rgb(24, 33, 58);"><br/>%%subheader%%</span></p>
       <br/>
       <p><em>%%description%%</em></p>
       <button id="widget-submit-button" style="  border: none; position: relative; width: 100%; background-color: rgb(24, 33, 58); ext-transform: uppercase; text-align: center; color: #fff;font-family: TuskerGrotesk-6500Medium;font-size: 0.75rem; letter-spacing: 2.5px; line-height: 17px; height: auto; padding: 12px 0px; box-sizing: border-box; display: inline-block;cursor: pointer;" class="tri__square">JOIN NOW</button>
       %%dismissButton%%
    </div></div>`;
    dismissButton = `<button id="widget-dismiss-button" style="margin-top: 15px; border: 1px solid rgb(24, 33, 58, 0.5); position: relative; width: 100%; background-color: rgb(24, 33, 58, 0.0); ext-transform: uppercase; text-align: center; color: #fff;font-family: TuskerGrotesk-6500Medium;font-size: 0.75rem; letter-spacing: 2.5px; line-height: 17px; height: auto; padding: 12px 0px; box-sizing: border-box; display: inline-block;cursor: pointer;">Maybe next time</button>`;
    constructor(config) {
        if (config) { this.header = config.header ? config.header : "Register to";
            this.subheader = config.subheader ? config.subheader : "continue reading...";
            this.description = config.description ? config.description : "The kind of reporting we do requires resources and time, and comes at significant risk to our team. For only P400 / month you can become a Rappler+ member and help keep us free and independent so we can continue to hold the line. Learn more";
            this.freezeScroll = config.freezeScroll;
            this.dismissible = config.dismissible }
        this.imitateLoginClick = this.imitateLoginClick.bind(this);
        this.imitateSignupClick = this.imitateSignupClick.bind(this);
        this.render = this.render.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.destroy = this.destroy.bind(this)
    }
    init() {
        // if (this._isMobile()) {
        //     console.log('setting up')
        //     window.onscroll = this.handleScroll
        // } else { console.log('not on mobile') }
        window.onscroll = this.handleScroll
    }
    disableScroll() { if (!this.isScrollDisabled) { this.isScrollDisabled = !0;
            document.body.style.overflowY = "hidden" } }
    enableScroll() {
        document.body.style.overflowY = ""
        this.isScrollResetLock = !1
    }
    preventDefault(e) { e.preventDefault() }
    handleScroll(e) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > this.lastScrollTop) {
            if (window.pageYOffset > (document.body.scrollHeight * 0.1)) {
                if (!this.widgetVisible) {
                    this.render();
                    window.dataLayer.push({ 'event': 'regwall-experiment-render', 'regwall-dismissible': this.dismissible });
                    this.widgetVisible = !0;
                    if (this.freezeScroll)
                        this.disableScroll()
                } else {
                    if (this.freezeScroll)
                        this.disableScroll()
                }
            }
        } else { this.enableScroll() }
        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    }
    imitateLoginClick() { document.getElementsByClassName('StyledComponents__PrimaryItem-sc-8b50a6-11 StyledComponents__TabletMobilePrimaryItem-sc-11uybho-8 dXXmMu')[0].click() }
    imitateSignupClick() { document.getElementsByClassName('Button-thxeg-0 StyledComponents__JoinButton-sc-11uybho-5 hZSvol')[0].click() }
    destroy() {
        document.body.style.overflowY = ""
        document.getElementById('main__form').remove()
    }
    render() {
        let rawHtml = this.htmlTemplate;
        rawHtml = rawHtml.replace('%%description%%', this.description);
        rawHtml = rawHtml.replace('%%header%%', this.header);
        rawHtml = rawHtml.replace('%%subheader%%', this.subheader);
        if (this.dismissible) { rawHtml = rawHtml.replace('%%dismissButton%%', this.dismissButton) } else { rawHtml = rawHtml.replace('%%dismissButton%%', "") }
        let html = this._stringToHTML(rawHtml);
        document.getElementsByTagName('body')[0].prepend(html);
        this._setActions()
    }
    _stringToHTML(html) { var template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html; return template.content.firstChild }
    _setActions() {
        document.getElementById('loginClick').onclick = this.imitateLoginClick;
        document.getElementById('widget-submit-button').onclick = this.imitateSignupClick;
        if (this.dismissible)
            document.getElementById('widget-dismiss-button').onclick = this.destroy
    }
    _toggleNodeVisibility(element) { element.style.display = window.getComputedStyle(element).display === 'block' ? 'none' : 'block' }
    _isMobile() { let check = !1;
        (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = !0 })(navigator.userAgent || navigator.vendor || window.opera); return check }
}