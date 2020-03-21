import React from 'react';
import {Add, Reset, ShowHide, ShowHideMap, Invalidate} from "../icons";

const FilterMenu = ({ onReset, onAdd, onShow, onMapShow, onInvalidate }) => (
	<React.Fragment>
		{ onShow && <ShowHide onClick={onShow} />}
		{ onMapShow && <ShowHideMap onClick={onMapShow} />}
		{ onAdd && <Add onClick={onAdd} />}
		{ onReset && <Reset onClick={onReset} />}
		{ onInvalidate && <Invalidate onClick={onInvalidate} />}
	</React.Fragment>
);

export default FilterMenu;