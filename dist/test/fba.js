var dor, dump, fba, loginInfo, print, ref;

fba = require('../lib/fba');

ref = require('./cfg'), loginInfo = ref.loginInfo, dump = ref.dump, print = ref.print;

dor = new fba.complex.DisplayableOrder(void 0, true, {
  id: true,
  isplayableorderid: '15555afafaf5555',
  comment: 'nigger poop'
});

dump(dor.get('ASD'));

dump(dor.render());
