import view from './view';
import controller from './controller';
import layout from '../../helpers/layout';
import ensureAuthenticated from '../../helpers/ensureAuthenticated';

export default {
	view: layout(view),
	controller: ensureAuthenticated(controller)
};
