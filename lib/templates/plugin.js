/**
 * @class Fb
 */
class Fb {
  constructor (fbq, options) {
    this.fbq = fbq
    this.options = options
  }

  /**
   * @method enable
   */
  enable () {
    this.init()
    this.track()
  }

  /**
   * @method init
   */
  init () {
    this.query('init', this.options.pixelId)
  }

  /**
   * @method track
   */
  track (event = null, parameters = null) {
    if (!event) {
      event = this.options.track
    }

    this.query('track', event, parameters)
  }

  /**
   * @method query
   * @param {string} cmd
   * @param {object} option
   * @param {object} parameters
   */
  query (cmd, option, parameters = null) {
    if (!parameters) {
      this.fbq(cmd, option)
    } else {
      this.fbq(cmd, option, parameters)
    }
  }
}

/**
 * @class Fbs
 */
class Fbs {
  constructor (fbq, options) {
    this.fbs = []
    for (var i = 0; i < options.length; i++) {
      this.fbs.push(new Fb(fbq, options[i]))
    }
  }


  /**
   * @method enable
   */
  enable () {
    for (var i = 0; i < this.fbs.length; i++) {
      this.fbs[i].enable()
    }
  }

  /**
   * @method init
   */
  init () {
    for (var i = 0; i < this.fbs.length; i++) {
      this.fbs[i].init()
    }
  }

  /**
   * @method track
   */
  track (event = null, parameters = null) {
    this.fbs[0].track(event, parameters)
    // for (var i = 0; i < this.fbs.length; i++) {
    //   this.fbs[i].track(event, parameters)
    // }
  }

  /**
   * @method query
   * @param {string} cmd
   * @param {object} option
   * @param {object} parameters
   */
  query (cmd, option, parameters = null) {
    this.fbs[0].query(cmd, option, parameters)
    // for (var i = 0; i < this.fbs.length; i++) {
    //   this.fbs[i].query(cmd, option, parameters)
    // }
  }
}

export default (ctx, inject) => {
  let _fbq

  /* eslint-disable */
  if (typeof window !== 'undefined') {
    ((f, b, e, v, n, t, s) => {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '<%= options[0].version %>';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.defer = true;
      t.src = v;
      s = b.getElementsByTagName('body')[0];
      s.parentNode.appendChild(t, s);

      _fbq = fbq;

      <% for (var i = 0; i < options.length; i++) { %>
      <% if (!options[i].disabled) { %>
      fbq('init', '<%= options[i].pixelId %>');
      <% } %>
      <% if (options[i].track) { %>
        fbq('trackSingle', '<%= options[i].pixelId %>', '<%= options[i].track %>');
      <% } %>
      <% } %>
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  }

  const instance = new Fbs(_fbq, <%= JSON.stringify(options) %>);

  /* eslint-enable */
  ctx.$fb = instance
  inject('fb', instance)
}
