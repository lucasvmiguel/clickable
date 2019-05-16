// @ts-ignore
var windowObj = window;
var response = {
    global: true,
    menu: {
        default: [
            { id: 1, text: "Like", icon: "like" },
            { id: 2, text: "Dislike", icon: "dislike" },
            { id: 3, text: "Share", icon: "share" },
        ],
        another: [
            { id: 3, text: "Share", icon: "share" },
            { id: 4, text: "Feedback", icon: "feedback" },
            { id: 5, text: "Another", icon: null },
        ]
    }
};
windowObj.addEventListener('load', function () {
    var menuValue = null;
    var menuVisible = null;
    var apiResponse = null;
    Promise.resolve(response).then(function (response) { apiResponse = response; });
    var likeIconMarkup = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 478.2 478.2\" class=\"clickable-icon\">\n      <g>\n        <path d=\"M457.575,325.1c9.8-12.5,14.5-25.9,13.9-39.7c-0.6-15.2-7.4-27.1-13-34.4c6.5-16.2,9-41.7-12.7-61.5   c-15.9-14.5-42.9-21-80.3-19.2c-26.3,1.2-48.3,6.1-49.2,6.3h-0.1c-5,0.9-10.3,2-15.7,3.2c-0.4-6.4,0.7-22.3,12.5-58.1   c14-42.6,13.2-75.2-2.6-97c-16.6-22.9-43.1-24.7-50.9-24.7c-7.5,0-14.4,3.1-19.3,8.8c-11.1,12.9-9.8,36.7-8.4,47.7   c-13.2,35.4-50.2,122.2-81.5,146.3c-0.6,0.4-1.1,0.9-1.6,1.4c-9.2,9.7-15.4,20.2-19.6,29.4c-5.9-3.2-12.6-5-19.8-5h-61   c-23,0-41.6,18.7-41.6,41.6v162.5c0,23,18.7,41.6,41.6,41.6h61c8.9,0,17.2-2.8,24-7.6l23.5,2.8c3.6,0.5,67.6,8.6,133.3,7.3   c11.9,0.9,23.1,1.4,33.5,1.4c17.9,0,33.5-1.4,46.5-4.2c30.6-6.5,51.5-19.5,62.1-38.6c8.1-14.6,8.1-29.1,6.8-38.3   c19.9-18,23.4-37.9,22.7-51.9C461.275,337.1,459.475,330.2,457.575,325.1z M48.275,447.3c-8.1,0-14.6-6.6-14.6-14.6V270.1   c0-8.1,6.6-14.6,14.6-14.6h61c8.1,0,14.6,6.6,14.6,14.6v162.5c0,8.1-6.6,14.6-14.6,14.6h-61V447.3z M431.975,313.4   c-4.2,4.4-5,11.1-1.8,16.3c0,0.1,4.1,7.1,4.6,16.7c0.7,13.1-5.6,24.7-18.8,34.6c-4.7,3.6-6.6,9.8-4.6,15.4c0,0.1,4.3,13.3-2.7,25.8   c-6.7,12-21.6,20.6-44.2,25.4c-18.1,3.9-42.7,4.6-72.9,2.2c-0.4,0-0.9,0-1.4,0c-64.3,1.4-129.3-7-130-7.1h-0.1l-10.1-1.2   c0.6-2.8,0.9-5.8,0.9-8.8V270.1c0-4.3-0.7-8.5-1.9-12.4c1.8-6.7,6.8-21.6,18.6-34.3c44.9-35.6,88.8-155.7,90.7-160.9   c0.8-2.1,1-4.4,0.6-6.7c-1.7-11.2-1.1-24.9,1.3-29c5.3,0.1,19.6,1.6,28.2,13.5c10.2,14.1,9.8,39.3-1.2,72.7   c-16.8,50.9-18.2,77.7-4.9,89.5c6.6,5.9,15.4,6.2,21.8,3.9c6.1-1.4,11.9-2.6,17.4-3.5c0.4-0.1,0.9-0.2,1.3-0.3   c30.7-6.7,85.7-10.8,104.8,6.6c16.2,14.8,4.7,34.4,3.4,36.5c-3.7,5.6-2.6,12.9,2.4,17.4c0.1,0.1,10.6,10,11.1,23.3   C444.875,295.3,440.675,304.4,431.975,313.4z\"></path>\n      </g>\n    </svg>\n  ";
    var dislikeIconMarkup = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 478.174 478.174\" class=\"clickable-icon\">\n      <g>\n        <path d=\"M457.525,153.074c1.9-5.1,3.7-12,4.2-20c0.7-14.1-2.8-33.9-22.7-51.9c1.3-9.2,1.3-23.8-6.8-38.3   c-10.7-19.2-31.6-32.2-62.2-38.7c-20.5-4.4-47.4-5.3-80-2.8c-65.7-1.3-129.7,6.8-133.3,7.3l-23.5,2.8c-6.8-4.8-15.1-7.6-24-7.6h-61   c-23,0-41.6,18.7-41.6,41.6v162.5c0,23,18.7,41.6,41.6,41.6h61c7.2,0,13.9-1.8,19.8-5c4.2,9.2,10.4,19.7,19.6,29.4   c0.5,0.5,1,1,1.6,1.4c31.4,24.1,68.4,110.9,81.5,146.3c-1.3,11-2.6,34.8,8.4,47.7c4.9,5.7,11.7,8.8,19.3,8.8   c7.7,0,34.3-1.8,50.9-24.7c15.7-21.8,16.6-54.4,2.6-97c-11.8-35.8-12.9-51.7-12.5-58.1c5.4,1.2,10.7,2.3,15.8,3.2h0.1   c0.9,0.2,22.9,5.1,49.2,6.3c37.4,1.8,64.5-4.7,80.3-19.2c21.8-19.9,19.2-45.3,12.7-61.5c5.6-7.3,12.4-19.2,13-34.4   C471.925,178.974,467.325,165.674,457.525,153.074z M109.225,222.674h-61c-8.1,0-14.6-6.6-14.6-14.6v-162.5   c0-8.1,6.6-14.6,14.6-14.6h61c8.1,0,14.6,6.6,14.6,14.6v162.5C123.825,216.174,117.325,222.674,109.225,222.674z M430.925,232.374   c0,0.1,3.5,5.6,4.7,13.1c1.5,9.3-1.1,17-8.1,23.4c-19.1,17.4-74.1,13.4-104.8,6.6c-0.4-0.1-0.8-0.2-1.3-0.3   c-5.5-1-11.4-2.2-17.4-3.5c-6.4-2.3-15.2-2-21.8,3.9c-13.3,11.8-11.8,38.6,4.9,89.5c11,33.4,11.4,58.6,1.2,72.7   c-8.6,11.9-22.8,13.4-28.2,13.5c-2.4-4-3.1-17.7-1.3-29c0.3-2.2,0.1-4.5-0.6-6.7c-1.9-5.1-45.8-125.3-90.7-160.9   c-11.7-12.7-16.8-27.6-18.6-34.3c1.2-3.9,1.9-8.1,1.9-12.4v-162.4c0-3-0.3-6-0.9-8.8l10.1-1.2h0.1c0.6-0.1,65.7-8.5,130-7.1   c0.4,0,0.9,0,1.4,0c30.3-2.4,54.8-1.7,72.9,2.2c22.4,4.8,37.2,13.2,44,25.1c7.1,12.3,3.2,25,2.9,26.2c-2.1,5.6-0.2,11.7,4.6,15.3   c29.6,22.2,16,48.1,14.2,51.3c-3.3,5.2-2.5,11.8,1.8,16.3c8.6,9,12.8,18,12.5,26.8c-0.4,13.1-10.5,22.9-11.2,23.5   C428.225,219.474,427.325,226.774,430.925,232.374z\" />\n      </g>\n    </svg>\n  ";
    var feedbackIconMarkup = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"clickable-icon\">\n      <g>\n        <g>\n          <g>\n              <path d=\"M117.333,149.333H352c5.896,0,10.667-4.771,10.667-10.667c0-5.896-4.771-10.667-10.667-10.667H117.333     c-5.896,0-10.667,4.771-10.667,10.667C106.667,144.563,111.438,149.333,117.333,149.333z\" />\n              <path d=\"M245.333,256h-128c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h128     c5.896,0,10.667-4.771,10.667-10.667C256,260.771,251.229,256,245.333,256z\" />\n              <path d=\"M471.167,64c-0.618,0-1.217,0.155-1.833,0.184V64c0-23.531-19.146-42.667-42.667-42.667h-384     C19.146,21.333,0,40.469,0,64v416c0,4.313,2.604,8.208,6.583,9.854c1.313,0.552,2.708,0.813,4.083,0.813     c2.771,0,5.5-1.083,7.542-3.125L121.75,384h304.917c23.521,0,42.667-19.135,42.667-42.667V164.411l30.708-30.703c0,0,0,0,0-0.01     c7.604-7.604,11.958-18.125,11.958-28.865C512,82.313,493.688,64,471.167,64z M448,341.333c0,11.76-9.563,21.333-21.333,21.333     H117.333c-2.833,0-5.542,1.125-7.542,3.125L21.333,454.25V64c0-11.76,9.563-21.333,21.333-21.333h384     C438.438,42.667,448,52.24,448,64v7.286c-2.025,1.392-3.962,2.923-5.708,4.672L326.232,192H117.333     c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h191.785l-10.243,51.24     c-0.708,3.5,0.396,7.115,2.917,9.635c2.021,2.021,4.75,3.125,7.542,3.125c0.688,0,1.396-0.073,2.083-0.208l53.313-10.667     c2.083-0.417,3.979-1.427,5.458-2.917L448,185.742V341.333z M357.396,246.177l-34.458,6.896l6.896-34.5l96.828-96.828     l27.587,27.587L357.396,246.177z M484.958,118.625l-15.625,15.625l-27.589-27.589l15.63-15.63     c3.625-3.615,8.646-5.698,13.792-5.698c10.75,0,19.5,8.75,19.5,19.5C490.667,109.958,488.583,114.99,484.958,118.625z\" />\n          </g>\n        </g>\n      </g>\n    </svg>\n  ";
    var shareIconMarkup = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 481.6 481.6\" class=\"clickable-icon\">\n      <g>\n        <path\n              d=\"M381.6,309.4c-27.7,0-52.4,13.2-68.2,33.6l-132.3-73.9c3.1-8.9,4.8-18.5,4.8-28.4c0-10-1.7-19.5-4.9-28.5l132.2-73.8\n        c15.7,20.5,40.5,33.8,68.3,33.8c47.4,0,86.1-38.6,86.1-86.1S429,0,381.5,0s-86.1,38.6-86.1,86.1c0,10,1.7,19.6,4.9,28.5\n        l-132.1,73.8c-15.7-20.6-40.5-33.8-68.3-33.8c-47.4,0-86.1,38.6-86.1,86.1s38.7,86.1,86.2,86.1c27.8,0,52.6-13.3,68.4-33.9\n        l132.2,73.9c-3.2,9-5,18.7-5,28.7c0,47.4,38.6,86.1,86.1,86.1s86.1-38.6,86.1-86.1S429.1,309.4,381.6,309.4z M381.6,27.1\n        c32.6,0,59.1,26.5,59.1,59.1s-26.5,59.1-59.1,59.1s-59.1-26.5-59.1-59.1S349.1,27.1,381.6,27.1z M100,299.8\n        c-32.6,0-59.1-26.5-59.1-59.1s26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1S132.5,299.8,100,299.8z M381.6,454.5\n        c-32.6,0-59.1-26.5-59.1-59.1c0-32.6,26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1C440.7,428,414.2,454.5,381.6,454.5z\" />\n      </g>\n    </svg>\n  ";
    var iconMarkup = function (icon) {
        switch (icon) {
            case 'like':
                return likeIconMarkup;
            case 'dislike':
                return dislikeIconMarkup;
            case 'feedback':
                return feedbackIconMarkup;
            case 'share':
                return shareIconMarkup;
            default:
                return '';
        }
    };
    var itemMarkup = function (_a) {
        var id = _a.id, text = _a.text, icon = _a.icon;
        return "\n    <li class=\"clickable-menu-option\" id=\"clickable-" + id + "\">\n      " + iconMarkup(icon) + "\n      " + text + "\n    </li>\n  ";
    };
    var menuMarkup = function (items) {
        if (!Array.isArray(items) || items.length < 1) {
            return '';
        }
        return "\n      <div id=\"clickable-menu\" style=\"display: block\">\n        <ul class=\"clickable-menu-options\">\n          " + items.map(function (i) { return itemMarkup(i); }).join('') + "\n        </ul>\n      </div>\n    ";
    };
    var getPositionClicked = function (event) { return ({
        left: event.pageX,
        top: event.pageY
    }); };
    var sendClickItem = function (_a) {
        var id = _a.id, value = _a.value;
        return windowObj.fetch("https://apiurl.com/options/" + id, {
            method: 'put',
            body: JSON.stringify({ value: value })
        });
    };
    var setPosition = function (_a) {
        var menuNode = _a.menuNode, top = _a.top, left = _a.left;
        var fixedLeft = left + menuNode.offsetWidth <= windowObj.innerWidth ? left : left - menuNode.offsetWidth;
        var fixedTop = top + menuNode.offsetHeight <= windowObj.innerHeight ? top : top - menuNode.offsetHeight;
        menuNode.style.left = fixedLeft + "px";
        menuNode.style.top = fixedTop + "px";
    };
    var getFirstClickableAttribute = function (node) {
        if (!node || !node.getAttributeNode) {
            return null;
        }
        var valueAttr = node.getAttributeNode("data-clickable-value");
        var menuAttr = node.getAttributeNode("data-clickable-menu");
        if (valueAttr || menuAttr) {
            return { value: valueAttr, menu: menuAttr };
        }
        return getFirstClickableAttribute(node.parentNode);
    };
    var getMenuNode = function () {
        return windowObj.document.getElementById("clickable-menu");
    };
    var deleteMenuNode = function () {
        var menu = windowObj.document.getElementById("clickable-menu");
        if (!menu) {
            return;
        }
        menu.parentElement.removeChild(menu);
    };
    var createMenu = function (_a) {
        var apiResponse = _a.apiResponse, menuType = _a.menuType;
        var items = menuType ? apiResponse.menu[menuType] : apiResponse.menu.default;
        var markup = menuMarkup(items);
        windowObj.document.getElementsByTagName("body")[0].innerHTML += markup;
    };
    windowObj.addEventListener("click", function (e) {
        var id = e.target.id;
        if (menuVisible && id) {
            sendClickItem({ id: id, value: menuValue });
        }
        ;
        menuValue = null;
        menuVisible = false;
        deleteMenuNode();
    });
    windowObj.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        var attrs = getFirstClickableAttribute(e.target);
        var position = getPositionClicked(e);
        var menuType = attrs && attrs.menu;
        createMenu({ apiResponse: apiResponse, menuType: menuType });
        var menuNode = getMenuNode();
        menuValue = attrs && attrs.value;
        menuVisible = true;
        // setPosition({ menuNode, top: position.top, left: position.left });
        return false;
    });
});
