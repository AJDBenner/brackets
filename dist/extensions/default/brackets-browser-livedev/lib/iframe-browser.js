define(function(require,exports,module){"use strict";var CommandManager=brackets.getModule("command/CommandManager"),MainViewManager=brackets.getModule("view/MainViewManager"),Commands=brackets.getModule("command/Commands");var VERTICAL_ORIENTATION=0,HORIZONTAL_ORIENTATION=1;var _orientation=VERTICAL_ORIENTATION;function init(){if(getBrowserIframe()){return}var result=MainViewManager.getLayoutScheme();if(result.rows===1&&result.columns===1){show(_orientation)}var _panel=$("#second-pane").empty();var iframeConfig={id:"bramble-iframe-browser",frameborder:0};$("<iframe>",iframeConfig).css({width:"100%",height:"100%"}).appendTo(_panel)}function setOrientation(orientation){if(orientation===VERTICAL_ORIENTATION){_orientation=VERTICAL_ORIENTATION}else if(orientation===HORIZONTAL_ORIENTATION){_orientation=HORIZONTAL_ORIENTATION}}function show(){if(_orientation===VERTICAL_ORIENTATION){CommandManager.execute(Commands.CMD_SPLITVIEW_VERTICAL)}else if(_orientation===HORIZONTAL_ORIENTATION){CommandManager.execute(Commands.CMD_SPLITVIEW_HORIZONTAL)}}function update(url){if(url){var iframe=getBrowserIframe();if(iframe){iframe.src=url}}}function getBrowserIframe(){return document.getElementById("bramble-iframe-browser")}exports.init=init;exports.update=update;exports.show=show;exports.getBrowserIframe=getBrowserIframe;exports.HORIZONTAL_ORIENTATION=HORIZONTAL_ORIENTATION;exports.VERTICAL_ORIENTATION=VERTICAL_ORIENTATION;exports.setOrientation=setOrientation});