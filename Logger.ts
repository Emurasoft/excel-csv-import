export class Logger {
	public constructor() {
		this._log = '';
	}

	// Records name and args. Do not add sensitive information.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public write(name: string, args?: {[key: string]: any}): void {
		this._log += JSON.stringify({name, args: args ? Logger.addFileName(args) : {}}) + '\n';
	}

	public log(): string {
		return this._log;
	}

	private _log: string;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private static addFileName(args: {[key: string]: any}): {} {
		// Replace file in ImportOptions with the filename
		if (
			'options' in args
            && 'source' in args.options
            && 'file' in args.options.source
            && typeof args.options.source.file === 'object'
            && 'options' in args
            && 'source' in (args as {options: {}}).options
            && 'file' in (args as {options: {source: {}}}).options.source
            && (args as {options: {source: {file: {}}}}).options.source.file instanceof File
		) {
			const filename = (args as {options: {source: {file: {name?: string}}}})
				.options.source.file.name;
			args.options.source.file = {name: filename};
		}
		return args;
	}
}