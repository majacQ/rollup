import Module, { AstContext } from '../../Module';
import { RenderOptions } from '../../utils/renderHelpers';
import { RESERVED_NAMES } from '../../utils/reservedNames';
import { getSystemExportStatement } from '../../utils/systemJsRendering';
import Identifier from '../nodes/Identifier';
import { UNKNOWN_PATH } from '../utils/PathTracker';
import Variable from './Variable';

export default class NamespaceVariable extends Variable {
	context: AstContext;
	isNamespace!: true;
	module: Module;

	private memberVariables: { [name: string]: Variable } | null = null;
	private mergedNamespaces: Variable[] = [];
	private referencedEarly = false;
	private references: Identifier[] = [];
	private syntheticNamedExports: boolean | string;

	constructor(context: AstContext, syntheticNamedExports: boolean | string) {
		super(context.getModuleName());
		this.context = context;
		this.module = context.module;
		this.syntheticNamedExports = syntheticNamedExports;
	}

	addReference(identifier: Identifier) {
		this.references.push(identifier);
		this.name = identifier.name;
	}

	// This is only called if "UNKNOWN_PATH" is reassigned as in all other situations, either the
	// build fails due to an illegal namespace reassignment or MemberExpression already forwards
	// the reassignment to the right variable. This means we lost track of this variable and thus
	// need to reassign all exports.
	deoptimizePath() {
		const memberVariables = this.getMemberVariables();
		for (const key of Object.keys(memberVariables)) {
			memberVariables[key].deoptimizePath(UNKNOWN_PATH);
		}
	}

	getMemberVariables(): { [name: string]: Variable } {
		if (this.memberVariables) {
			return this.memberVariables;
		}
		const memberVariables = Object.create(null);
		for (const name of this.context.getExports().concat(this.context.getReexports())) {
			if (name[0] !== '*' && name !== this.module.syntheticNamedExports) {
				memberVariables[name] = this.context.traceExport(name);
			}
		}
		return (this.memberVariables = memberVariables);
	}

	include() {
		this.included = true;
		this.context.includeAllExports();
	}

	prepareNamespace(mergedNamespaces: Variable[]) {
		this.mergedNamespaces = mergedNamespaces;
		const moduleExecIndex = this.context.getModuleExecIndex();
		for (const identifier of this.references) {
			if (identifier.context.getModuleExecIndex() <= moduleExecIndex) {
				this.referencedEarly = true;
				break;
			}
		}
	}

	renderBlock(options: RenderOptions) {
		const _ = options.compact ? '' : ' ';
		const n = options.compact ? '' : '\n';
		const t = options.indent;
		const s = options.compact ? '' : ';';

		let output = this.getCombinedNamespaceObject(options.namespaceToStringTag, _, n, t, s);
		if (options.esModule) {
			output = `/*#__PURE__*/Object.defineProperty(${output},${_}'__esModule',${_}{${_}value:${_}true${_}})`;
		}
		if (options.freeze) {
			output = `/*#__PURE__*/Object.freeze(${output})`;
		}
		const name = this.getName();
		output = `${options.varOrConst} ${name}${_}=${_}${output};`;

		if (options.format === 'system' && options.exportNamesByVariable.has(this)) {
			output += `${n}${getSystemExportStatement([this], options)};`;
		}

		return output;
	}

	renderFirst() {
		return this.referencedEarly;
	}

	private getCombinedNamespaceObject(
		namespaceToStringTag: boolean,
		_: string,
		n: string,
		t: string,
		s: string
	): string {
		const members = this.getRenderedNamespaceMembers(_, t, s);
		if (namespaceToStringTag) {
			members.unshift(`${t}[Symbol.toStringTag]:${_}'Module'`);
		}
		if (this.mergedNamespaces.length > 0 || this.syntheticNamedExports) {
			const assignmentArgs: string[] = ['/*#__PURE__*/Object.create(null)'];
			if (this.mergedNamespaces.length > 0) {
				assignmentArgs.push(...this.mergedNamespaces.map(variable => variable.getName()));
			}
			if (this.syntheticNamedExports) {
				assignmentArgs.push(this.module.getSyntheticNamespace().getName());
			}
			if (members.length > 0) {
				assignmentArgs.push(joinMembersToObject(members, n));
			}
			return `/*#__PURE__*/Object.assign(${assignmentArgs.join(`,${_}`)})`;
		} else {
			members.unshift(`${t}__proto__:${_}null`);
			return joinMembersToObject(members, n);
		}
	}

	private getRenderedNamespaceMembers(_: string, t: string, s: string): string[] {
		const memberVariables = this.getMemberVariables();
		return Object.keys(memberVariables).map(name => {
			const original = memberVariables[name];

			if (this.referencedEarly || original.isReassigned) {
				return `${t}get ${name}${_}()${_}{${_}return ${original.getName()}${s}${_}}`;
			}

			const safeName = RESERVED_NAMES[name] ? `'${name}'` : name;

			return `${t}${safeName}: ${original.getName()}`;
		});
	}
}

NamespaceVariable.prototype.isNamespace = true;

function joinMembersToObject(members: string[], n: string): string {
	return `{${n}${members.join(`,${n}`)}${n}}`;
}
