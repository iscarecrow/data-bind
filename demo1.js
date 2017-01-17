(function(window){
  var Hugin = function(opt) {
    var el = opt.el || '';
    var data = opt.data || {};
    return Hugin.prototype.init(el,data);
  };

  Hugin.prototype = {
    constructor: Hugin,
    init: function(el,data) {
      this.el = el;
      this.data = data;
      this.bindModel();
      this.bindRender();
    },
    // dom h-model  to watch data
    bindModel: function() {
      var doms = document.querySelectorAll('[h-model]');
      for (var i=0; i <doms.length; i++) {
        var key = doms[i].getAttribute('h-model');
        var value = this.data[key] || '';
        doms[i].value = value;
        this.dataWatch(this.data, key,value);
        this.bindEvent();
      }
    },
    // use Object.defineProperty set to watch data model change 
    dataWatch: function(data, name, value) {
      var bValue = value || '';
      try {
        Object.defineProperty(data, name, {
          get: () => {
            return bValue;
          },
          set: (newValue) => {
            bValue = newValue;
            this.bindRender(name);
          },
          enumerable: true,
          configurable: true
        });
      } catch(erro) {
        console.log('ie>8');
      }
    },
    // event is more than h-model, it's just example
    bindEvent: function() {
      var eventDoms = document.querySelectorAll('input[h-model]');
      if (document.addEventListener) {
        for (var i=0; i<eventDoms.length; i++) {
          var eventDom = eventDoms[i];
          var key = eventDom.getAttribute('h-model');
          eventDom.addEventListener('keyup', (e)=>{
            this.data[key] = e.target.value;
          });
        }
      }
    },
    bindRender: function(key) {
      var selector = key ? "[h-text="+ key +"]" : "[h-text]";
      var doms = document.querySelectorAll(selector);
      for (var i=0; i<doms.length; i++) {
        var key = doms[i].getAttribute('h-text');
        doms[i].innerHTML = this.data[key] || '';
      }
    }
  };

  Hugin.prototype.init.prototype = Hugin.prototype;
  window.Hugin = Hugin;

})(window)