import { currentURL, find, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | current url', function(hooks) {
  setupApplicationTest(hooks);

  // We need to support legacy `current` urls, but we should use release
  // in order to keep in step with ember-api-docs url convention

  test('visiting /current-url', async function(assert) {
    await visit('/current');
    let page = this.application.__container__.lookup('service:page');
    let currentVersion = page.get('currentVersion');
    assert.equal(find('.ember-basic-dropdown-trigger').textContent.trim(), currentVersion);
  });

  test('visiting /release-url', async function(assert) {
    await visit('/release');
    let page = this.application.__container__.lookup('service:page');
    let currentVersion = page.get('currentVersion');
    assert.equal(find('.ember-basic-dropdown-trigger').textContent.trim(), currentVersion);
  });

  test('visiting / redirects you to /release', async function(assert) {
    await visit('/');
    let page = this.application.__container__.lookup('service:page');
    assert.equal(currentURL(), "/release");

    let currentVersion = page.get('currentVersion');
    assert.equal(find('.ember-basic-dropdown-trigger').textContent.trim(), currentVersion);
  });
});
