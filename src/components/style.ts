// Office UI Fabric overrides className props so .css cannot be used. However, inline styles are not
// overridden.
import {CSSProperties} from 'react';

export const monospace: CSSProperties = {"fontFamily": "Inconsolata, monospace"};