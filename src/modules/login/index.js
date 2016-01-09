import view from './view';
import controller from './controller';
import layout from '../../helpers/layout';

export default {
	view: layout(view),
	controller: controller
};
