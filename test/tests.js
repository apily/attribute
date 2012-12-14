var Attribute = require('attribute');
var assert = require('component-assert');

var User;
var user;
var me = {
  name: 'Federico',
  age: 28,
  isHungry: true,
  pets: ['Laica', 'Duccio']
};
var check_user = function(user, me) {
  for (var prop in me) {
    assert(user.get(prop) === me[prop]);
  }
};



describe('Attribute', function() {
  describe('mixin', function() {
    describe('constructor', function() {
      beforeEach(function() {
        User = function(id) { this.id = id; };
        user = new User('007');
        Attribute(user);
      });

      afterEach(function() {
        user = undefined;
        User = undefined;
      });

      it('should not modify instance properties', function() {
        assert(user.hasOwnProperty('id'));
        assert(user.id === '007');
      });

      it('should been mixed-in `Attributes` properties correctly', function() {
        assert(user.hasOwnProperty('get'));
        assert(typeof user.get === 'function');
        assert(user.hasOwnProperty('set'));
        assert(typeof user.set === 'function');
      });

      it('should been mixed-in `Emitter` properties correctly', function() {
        assert(user.hasOwnProperty('on'));
        assert(typeof user.on === 'function');
        assert(user.hasOwnProperty('once'));
        assert(typeof user.once === 'function');
        assert(user.hasOwnProperty('off'));
        assert(typeof user.off === 'function');
        assert(user.hasOwnProperty('emit'));
        assert(typeof user.emit === 'function');
        assert(user.hasOwnProperty('listeners'));
        assert(typeof user.listeners === 'function');
        assert(user.hasOwnProperty('hasListeners'));
        assert(typeof user.hasListeners === 'function');
      });
    });

    describe('.set(name_or_obj, value)', function() {
      beforeEach(function() {
        User = function(id) { this.id = id; };
        user = new User('007');
        Attribute(user);
      });

      afterEach(function() {
        user = undefined;
        User = undefined;
      });

      it('should set `name/value` pair when pass `name` and `value`', function() {
        user
          .set('name', me.name)
          .set('age', me.age)
          .set('isHungry', me.isHungry)
          .set('pets', me.pets);

        check_user(user, me);
      });

      it('should set `undefine` value to property `name` when pass only a `name` string', function() {
        user.set('name');
        assert(user.get('name') === undefined);
      });

      it('should set all the `name/value` pairs when pass an object', function() {
        user.set(me);

        check_user(user, me);
      });

      it('should emit `change:[name]` when pass `name` and `value`', function(done) {
        user.on('change:name', function(changed_user) {
          assert(changed_user.id === '007');
          assert(changed_user.get('name') === me.name);
          done();
        });

        user.set('name', me.name);
      });

      it('should emit `change:[name]` value to property `name` when pass only a `name` string', function(done) {
        user.on('change:name', function(changed_user) {
          assert(changed_user.id === '007');
          assert(changed_user.get('name') === undefined);
          done();
        });

        user.set('name');
      });

      it('should emit `change:[name]` for each of the properties when pass an abject', function(done) {
        var map = ['name', 'age', 'isHungry', 'pets'];
        var fired = new Array(4);

        var check = function(prop) {
          var index = map.indexOf(prop);
          fired[index] = true;
          assert(user.get(prop) === me[prop]);

          if (fired.every(function(item) { return item; })) {
            done();
          }
        };

        user
          .on('change:name', function() {
            check('name');
          })
          .on('change:age', function() {
            check('age');
          })
          .on('change:isHungry', function() {
            check('isHungry');
          })
          .on('change:pets', function() {
            check('pets');
          })

        user.set(me);
      });

      it('should emit `change` event when pass `name` and `value`', function(done) {
        user.on('change', function(changed_user) {
          assert(changed_user.id === '007');
          assert(changed_user.get('name') === me.name);
          done();
        });

        user.set('name', me.name);
      });

      it('should emit `change` (only once) when pass an abject', function(done) {
        user.on('change', function(changed_user) {
          assert(changed_user.id === '007');
          check_user(changed_user, me);
          done();
        });

        user.set(me);
      });
    });

    describe('.get(attribute)', function() {
      beforeEach(function() {
        User = function(id) { this.id = id; };
        user = new User('007');
        Attribute(user);
        user
          .set('name', me.name)
          .set('age', me.age)
          .set('isHungry', me.isHungry)
          .set('pets', me.pets);
      });

      afterEach(function() {
        user = undefined;
        User = undefined;
      });

      it('should not assign properties directly to instance', function() {
        assert(!user.hasOwnProperty('name'));
        assert(!user.hasOwnProperty('age'));
        assert(!user.hasOwnProperty('isHungry'));
        assert(!user.hasOwnProperty('pets'));
      });

      it('should return queried attribute valued', function() {
        assert(user.get('name') === me.name);
        assert(user.get('age') === me.age);
        assert(user.get('isHungry') === me.isHungry);
        assert(user.get('pets') === me.pets);
      });
    });
  });

  describe('prototype mixin', function() {
    describe('constructor', function() {
      beforeEach(function() {
        User = function(id) { this.id = id; };
        Attribute(User.prototype);
        user = new User('007');
        user
          .set('name', me.name)
          .set('age', me.age)
          .set('isHungry', me.isHungry)
          .set('pets', me.pets);
      });

      afterEach(function() {
        user = undefined;
        User = undefined;
      });

      it('should not modify instance properties', function() {
        assert(user.hasOwnProperty('id'));
        assert(user.id === '007');
      });

      it('should been mixed-in `Attributes` properties correctly', function() {
        assert(!user.hasOwnProperty('get'));
        assert(typeof user.get === 'function');
        assert(!user.hasOwnProperty('set'));
        assert(typeof user.set === 'function');
      });

      it('should been mixed-in `Emitter` properties correctly', function() {
        assert(typeof user.on === 'function');
        assert(typeof user.once === 'function');
        assert(typeof user.off === 'function');
        assert(typeof user.emit === 'function');
        assert(typeof user.listeners === 'function');
        assert(typeof user.hasListeners === 'function');
      });
    });

    describe('.set(name_or_obj, value)', function() {
      beforeEach(function() {
        User = function(id) { this.id = id; };
        Attribute(User.prototype);
        user = new User('007');
      });

      afterEach(function() {
        user = undefined;
        User = undefined;
      });

      it('should set `name/value` pair when pass `name` and `value`', function() {
        user
          .set('name', me.name)
          .set('age', me.age)
          .set('isHungry', me.isHungry)
          .set('pets', me.pets);

        check_user(user, me);
      });

      it('should set `undefine` value to property `name` when pass only a `name` string', function() {
        user.set('name');
        assert(user.get('name') === undefined);
      });

      it('should set all the `name/value` pairs when pass an object', function() {
        user.set(me);

        check_user(user, me);
      });

      it('should emit `change:[name]` when pass `name` and `value`', function(done) {
        user.on('change:name', function(changed_user) {
          assert(changed_user.id === '007');
          assert(changed_user.get('name') === me.name);
          done();
        });

        user.set('name', me.name);
      });

      it('should emit `change:[name]` value to property `name` when pass only a `name` string', function(done) {
        user.on('change:name', function(changed_user) {
          assert(changed_user.id === '007');
          assert(changed_user.get('name') === undefined);
          done();
        });

        user.set('name');
      });

      it('should emit `change:[name]` for each of the properties when pass an abject', function(done) {
        var map = ['name', 'age', 'isHungry', 'pets'];
        var fired = new Array(4);

        var check = function(prop) {
          var index = map.indexOf(prop);
          fired[index] = true;
          assert(user.get(prop) === me[prop]);

          if (fired.every(function(item) { return item; })) {
            done();
          }
        };

        user
          .on('change:name', function() {
            check('name');
          })
          .on('change:age', function() {
            check('age');
          })
          .on('change:isHungry', function() {
            check('isHungry');
          })
          .on('change:pets', function() {
            check('pets');
          })

        user.set(me);
      });

      it('should emit `change` event when pass `name` and `value`', function(done) {
        user.on('change', function(changed_user) {
          assert(changed_user.id === '007');
          assert(changed_user.get('name') === me.name);
          done();
        });

        user.set('name', me.name);
      });

      it('should emit `change` (only once) when pass an abject', function(done) {
        user.on('change', function(changed_user) {
          assert(changed_user.id === '007');
          check_user(changed_user, me);
          done();
        });

        user.set(me);
      });
    });

    describe('.get(attribute)', function() {
      beforeEach(function() {
        User = function(id) { this.id = id; };
        Attribute(User.prototype);
        user = new User('007');
        user
          .set('name', me.name)
          .set('age', me.age)
          .set('isHungry', me.isHungry)
          .set('pets', me.pets);
      });

      afterEach(function() {
        user = undefined;
        User = undefined;
      });

      it('should not assign properties directly to instance', function() {
        assert(!user.hasOwnProperty('name'));
        assert(!user.hasOwnProperty('age'));
        assert(!user.hasOwnProperty('isHungry'));
        assert(!user.hasOwnProperty('pets'));
      });

      it('should return queried attribute valued', function() {
        assert(user.get('name') === me.name);
        assert(user.get('age') === me.age);
        assert(user.get('isHungry') === me.isHungry);
        assert(user.get('pets') === me.pets);
      });
    });
  });
});