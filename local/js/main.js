'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.onload = function () {
    init();
};

function init() {
    var map = document.querySelector('.js-map');
    var storesData = window.storesData;
    //if (map && storesData.length > 0) {
    if(map) {
        var searchPage = new MapPage(map, storesData);
    }

    var showMoreBtn = document.querySelector('.js-showMore');
    if (showMoreBtn) {
        var storesPage = new StorePage(showMoreBtn);
    }
}

var MapPage = function () {
    function MapPage(mapEl, storesData) {
        _classCallCheck(this, MapPage);

        this.map = mapEl;
        this.storesData = storesData;
        this.filters = [];
        this.checkboxes = [];
        this.resultsItems = [];
        this.dayOfWeek = new Date().getDay();

        this.getElements();
        this.attachEvents();
        this.buildResults();
    }

    _createClass(MapPage, [{
        key: 'getElements',
        value: function getElements() {
            this.resultsTarget = document.querySelector('.js-toggleResults-target');
            this.mapBtn = document.querySelector('.js-toggleMap');
            this.resultsBtn = document.querySelector('.js-toggleResults');
            this.activeList = [this.mapBtn, this.resultsBtn, this.resultsTarget, this.map];
            this.filterEl = document.querySelector('.js-filter');

            this.checkboxEl = document.querySelector('.js-checkboxes');
            this.checkAll = document.querySelector('.js-showAll');
            this.stores = document.querySelector('.js-storeResults');
            this.storePopup = document.querySelector('.storePopup');
            //this.closeBtn = this.storePopup.querySelector('.storePopup-close');
            this.pins = document.querySelectorAll('.storePin');
        }
    }, {
        key: 'attachEvents',
        value: function attachEvents() {
            var _this = this;

            this.mapBtn.addEventListener('click', function () {
                _this.toggleClass(_this.map, _this.activeList, _this.mapBtn);
            });

            this.resultsBtn.addEventListener('click', function () {
                _this.toggleClass(_this.resultsTarget, _this.activeList, _this.resultsBtn);
            });
            
            Array.from(this.stores.children).map(function (el, i) {
                _this.attachStoresEvent(el, i);
            });

            Array.from(this.pins).map(function (el, i) {
                el.addEventListener('click', function () {
                    _this.createStorePopup(_this.storePopup, _this.storesData[i]);
                    _this.activate(_this.storePopup);
                    _this.toggleClass(el, Array.from(_this.pins));
                });
            });

            this.closeBtn.addEventListener('click', this.closeStorePopup);

            Array.from(this.filterEl.children).map(function (el) {
                el.children[1].addEventListener('click', _this.filterOnClick.bind(_this));
            });

            Array.from(this.checkboxEl.children).map(function (el) {
                el.children[1].addEventListener('click', _this.onCheck.bind(_this));
            });

            this.checkAll.checked = true;
        }
    }, {
        key: 'attachStoresEvent',
        value: function attachStoresEvent(el, i) {
            var _this2 = this;

            el.addEventListener('click', function () {
                _this2.createStorePopup(_this2.storePopup, _this2.storesData[i]);
                _this2.activate(_this2.storePopup);
                _this2.toggleClass(_this2.map, _this2.activeList, _this2.mapBtn);
            });

            el.addEventListener('mouseenter', function () {
                return _this2.pins[i] && _this2.activate(_this2.pins[i]);
            });

            el.addEventListener('mouseleave', function () {
                _this2.pins[i] && _this2.deactivate(_this2.pins[i]);
            });
        }
    }, {
        key: 'buildResults',
        value: function buildResults() {
            var _this3 = this;

            this.storesData.forEach(function (store, i) {
                return _this3.createResultsItem(store);
            });
        }
    }, {
        key: 'loopCheckboxes',
        value: function loopCheckboxes(list1, list2) {
            return list2.some(function (r) {
                return list1.includes(r.toLowerCase());
            });
        }
    }, {
        key: 'renderResults',
        value: function renderResults() {
            var _this4 = this;

            this.stores.innerHTML = '';
            var stores = this.resultsItems;
            this.checkAll.checked = true;

            if (this.checkboxes.length > 0) {
                this.checkAll.checked = false;
                stores = stores.filter(function (s) {
                    return _this4.loopCheckboxes(_this4.checkboxes, s.assortments);
                });
            }

            if (this.filters.length > 0) {
                stores = stores.filter(function (s) {
                    return _this4.filters.includes(s.type.toLowerCase());
                });

                stores.map(function (s, i) {
                    _this4.stores.appendChild(s.el);
                    _this4.attachStoresEvent(s.el, i);
                });
            } else {
                stores.map(function (s, i) {
                    _this4.stores.appendChild(s.el);
                    _this4.attachStoresEvent(s.el, i);
                });
            }
        }
    }, {
        key: 'onCheck',
        value: function onCheck(e) {
            var type = e.target.textContent.trim().toLowerCase();

            if (this.checkboxes.includes(type)) {
                this.checkboxes.splice(this.checkboxes.indexOf(type), 1);
            } else {
                this.checkboxes.push(type);
            }

            this.renderResults();
        }
    }, {
        key: 'filterOnClick',
        value: function filterOnClick(e) {
            var type = e.target.textContent.trim().toLowerCase();

            if (this.filters.includes(type)) {
                this.filters.splice(this.filters.indexOf(type), 1);
            } else {
                this.filters.push(type);
            }

            this.renderResults();
        }
    }, {
        key: 'createResultsItem',
        value: function createResultsItem(data) {
            var li = document.createElement('li');
            li.className = 'results-item store';

            var content = document.createElement('div');
            content.className = 'store-content';

            var title = document.createElement('h5');
            title.className = 'store-title';
            title.setAttribute('aria-label', 'store name');
            title.textContent = data.name;

            var logoWrapper = document.createElement('div');
            var img = new Image();
            img.className = 'store-logo';
            img.src = data.logo.default;

            var address = document.createElement('address');
            address.className = 'store-address';
            address.setAttribute('aria-label', 'store address');
            address.textContent = data.address;

            var distance = document.createElement('span');
            distance.className = 'store-distance';
            distance.setAttribute('aria-label', 'distance');
            distance.textContent = data.distance;

            content.appendChild(title);
            content.appendChild(address);
            content.appendChild(distance);
            logoWrapper.appendChild(img);
            li.appendChild(logoWrapper);
            li.appendChild(content);

            this.resultsItems.push({
                type: data.tag,
                assortments: data.assortments,
                el: li
            });
        }
    }, {
        key: 'createStorePopup',
        value: function createStorePopup(targetEl, indexedData) {
            var obj = {};
            obj.name = targetEl.querySelector('.store-title');
            obj.address = targetEl.querySelector('.store-address');
            obj.distance = targetEl.querySelector('.store-distance');
            obj.tag = targetEl.querySelector('.storePopup-tag');
            obj.phone = targetEl.querySelector('.storePopup-link--phone');

            var categories = targetEl.querySelector('.storePopup-categories');
            var openHoursToday = targetEl.querySelector('.storePopup-openHours');
            var logo = targetEl.querySelector('.store-logo');

            this.fillTextFields(obj, indexedData);

            this.changeCategoriesContent(categories, indexedData);

            openHoursToday.textContent = indexedData.openHoursText + ' ' + this.getLastHour(indexedData.openHours[this.dayOfWeek]);

            logo.src = indexedData.logo.active;

            if (indexedData.logo.active.indexOf('retailer') !== -1) {
                targetEl.classList.remove('storePopup--store');
            } else {
                targetEl.classList.add('storePopup--store');
            }
        }
    }, {
        key: 'createCategoryItem',
        value: function createCategoryItem(text) {
            var li = document.createElement('li');
            li.className = 'storePopup-categories-item';
            li.textContent = text;

            return li;
        }
    }, {
        key: 'changeCategoriesContent',
        value: function changeCategoriesContent(categories, indexedData) {
            var _this5 = this;

            categories.innerHTML = '';
            indexedData.assortments.forEach(function (text) {
                categories.appendChild(_this5.createCategoryItem(text));
            });
        }
    }, {
        key: 'toggleClass',
        value: function toggleClass(el) {
            var _this6 = this;

            var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var secondEl = arguments[2];

            if (el.classList.contains('active')) {
                return;
            }

            all.map(function (e) {
                return _this6.deactivate(e);
            });
            this.activate(el);

            if (secondEl) {
                this.activate(secondEl);
            }
        }
    }, {
        key: 'fillTextFields',
        value: function fillTextFields(obj, data) {
            for (var field in data) {
                if (obj[field]) {
                    obj[field].textContent = data[field];
                }
            }
        }
    }, {
        key: 'closeStorePopup',
        value: function closeStorePopup() {
            this.deactivate(this.storePopup);
        }
    }, {
        key: 'activate',
        value: function activate(el) {
            el.classList.add('active');
        }
    }, {
        key: 'deactivate',
        value: function deactivate(el) {
            el.classList.remove('active');
        }
    }, {
        key: 'getLastHour',
        value: function getLastHour() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '00:00';

            return time.substring(time.lastIndexOf('-') + 1, time.length).trim();
        }
    }]);

    return MapPage;
}();

var StorePage = function () {
    function StorePage(showMoreBtn) {
        _classCallCheck(this, StorePage);

        this.showMoreBtn = showMoreBtn;
        this.content = document.querySelector('.js-showMore-target');
        this.showMore();
    }

    _createClass(StorePage, [{
        key: 'showMore',
        value: function showMore() {
            var _this7 = this;

            if (!this.showMoreBtn) return;

            var state = false;

            var height = this.toggleShowMore(this.showMoreBtn, this.content, state);
            this.content.style.maxHeight = height + 'px';

            this.showMoreBtn.addEventListener('click', function () {
                state = !state;
                _this7.toggleShowMore(_this7.showMoreBtn, _this7.content, state);
            });
        }
    }, {
        key: 'toggleShowMore',
        value: function toggleShowMore(btn, target, show) {
            var cHeight = target.children[0].clientHeight;

            if (show) {
                btn.classList.add('active');
                target.style.maxHeight = '1900px';

                setTimeout(function () {
                    target.classList.remove('minimized');
                }, 300);
            } else {
                btn.classList.remove('active');
                target.style.maxHeight = cHeight + 'px';

                setTimeout(function () {
                    target.classList.add('minimized');
                }, 300);
            }

            return cHeight;
        }
    }]);

    return StorePage;
}();