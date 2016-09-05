'use strict';

describe('Statistics Monitor Application', function() {
  describe('statsList',function () {
    beforeEach(function () {
      browser.get('index.html');

    });

    it('should filter the stats list as a user types into the search box',
        function () {
          var statsList = element.all(by.repeater('stat in $ctrl.stats'));
          var query = element(by.model('$ctrl.query'));

          expect(statsList.count()).toBe(9);

          query.sendKeys('Total');
          expect(statsList.count()).toBe(4);

          query.clear();
          expect(statsList.count()).toBe(9);
    });
  });
});

