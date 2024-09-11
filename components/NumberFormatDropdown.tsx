import {Dropdown, Label, Subtitle1, Option} from '@fluentui/react-components';
import * as React from 'react';

export default function NumberFormatDropdown() {
	return (
		<Label>
			<Subtitle1>Number format</Subtitle1>
			<Dropdown>
				<Option>
					Text
				</Option>
				<Option>
					General
				</Option>
			</Dropdown>
		</Label>
	);
}
