'use strict';

describe('StatsListController', function() {

  beforeEach(module('statsApp'));

  it('should create a `stats` model with 2 stats', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('StatsListController', {$scope: scope});

    expect(scope.stats.length).toBe(2);
  }));

});
