import { get, set } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  page: service(),

  model(params) {
    let applicationModel = this.modelFor('application');
    let { currentVersion } = applicationModel;
    let version = params.version;

    // We need to support legacy `current` urls, but we should use release
    // in order to keep in step with ember-api-docs url convention
    if (params.version === 'current' || params.version === 'release') {
      version = currentVersion;
    }

    return hash({
      pages: this.store.query('page', { version }),
      allVersions: get(applicationModel, 'allVersions'),
      currentVersion,
      version: version,
    });
  },

  afterModel(model) {
    set(this.page, 'pages', get(model, 'pages'));
  }
});
