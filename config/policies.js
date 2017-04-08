'use strict';

/**
 * Define which prerequisites a request must pass before reaching the intended
 * controller action. By default, no policies are configured for controllers,
 * therefore the request always will directly reach the intended handler.
 */
module.exports = {
  'all ^/(?!favicon|js/|styles/).*$': ['noCache'],
  'post ^/(?!favicon|js/|styles/).*$': ['bodyParser'],
  'all ^/(?!favicon|js/|styles/|modern\\-browser/).*$': ['modernBrowser'],
};
