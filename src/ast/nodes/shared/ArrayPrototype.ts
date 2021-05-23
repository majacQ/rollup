import { UnknownInteger } from '../../utils/PathTracker';
import { UNKNOWN_LITERAL_BOOLEAN, UNKNOWN_LITERAL_NUMBER } from '../../values';
import { ExpressionEntity, UNKNOWN_EXPRESSION } from './Expression';
import {
	Method,
	METHOD_RETURNS_BOOLEAN,
	METHOD_RETURNS_NUMBER,
	METHOD_RETURNS_STRING,
	METHOD_RETURNS_UNKNOWN
} from './MethodTypes';
import { ObjectEntity, ObjectProperty } from './ObjectEntity';
import { OBJECT_PROTOTYPE } from './ObjectPrototype';

const NEW_ARRAY_PROPERTIES: ObjectProperty[] = [
	{ kind: 'init', key: UnknownInteger, property: UNKNOWN_EXPRESSION },
	{ kind: 'init', key: 'length', property: UNKNOWN_LITERAL_NUMBER }
];

const METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_BOOLEAN: [ExpressionEntity] = [
	new Method({
		callsArgs: [0],
		mutatesSelfAsArray: true,
		returns: null,
		returnsPrimitive: UNKNOWN_LITERAL_BOOLEAN
	})
];

const METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_NUMBER: [ExpressionEntity] = [
	new Method({
		callsArgs: [0],
		mutatesSelfAsArray: true,
		returns: null,
		returnsPrimitive: UNKNOWN_LITERAL_NUMBER
	})
];

export const METHOD_RETURNS_NEW_ARRAY: [ExpressionEntity] = [
	new Method({
		callsArgs: null,
		mutatesSelfAsArray: false,
		returns: () => new ObjectEntity(NEW_ARRAY_PROPERTIES, ARRAY_PROTOTYPE),
		returnsPrimitive: null
	})
];

const METHOD_MUTATES_SELF_RETURNS_NEW_ARRAY: [ExpressionEntity] = [
	new Method({
		callsArgs: null,
		mutatesSelfAsArray: true,
		returns: () => new ObjectEntity(NEW_ARRAY_PROPERTIES, ARRAY_PROTOTYPE),
		returnsPrimitive: null
	})
];

const METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_NEW_ARRAY: [ExpressionEntity] = [
	new Method({
		callsArgs: [0],
		mutatesSelfAsArray: true,
		returns: () => new ObjectEntity(NEW_ARRAY_PROPERTIES, ARRAY_PROTOTYPE),
		returnsPrimitive: null
	})
];

const METHOD_MUTATES_SELF_RETURNS_NUMBER: [ExpressionEntity] = [
	new Method({
		callsArgs: null,
		mutatesSelfAsArray: true,
		returns: null,
		returnsPrimitive: UNKNOWN_LITERAL_NUMBER
	})
];

const METHOD_MUTATES_SELF_RETURNS_UNKNOWN: [ExpressionEntity] = [
	new Method({
		callsArgs: null,
		mutatesSelfAsArray: true,
		returns: null,
		returnsPrimitive: UNKNOWN_EXPRESSION
	})
];

const METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_UNKNOWN: [ExpressionEntity] = [
	new Method({
		callsArgs: [0],
		mutatesSelfAsArray: true,
		returns: null,
		returnsPrimitive: UNKNOWN_EXPRESSION
	})
];

const METHOD_MUTATES_SELF_RETURNS_SELF: [ExpressionEntity] = [
	new Method({
		callsArgs: null,
		mutatesSelfAsArray: true,
		returns: 'self',
		returnsPrimitive: null
	})
];

const METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_SELF: [ExpressionEntity] = [
	new Method({
		callsArgs: [0],
		mutatesSelfAsArray: true,
		returns: 'self',
		returnsPrimitive: null
	})
];

export const ARRAY_PROTOTYPE = new ObjectEntity(
	{
		// @ts-ignore
		__proto__: null,
		// We assume that accessors have effects as we do not track the accessed value afterwards
		at: METHOD_MUTATES_SELF_RETURNS_UNKNOWN,
		concat: METHOD_RETURNS_NEW_ARRAY,
		copyWithin: METHOD_MUTATES_SELF_RETURNS_SELF,
		entries: METHOD_MUTATES_SELF_RETURNS_NEW_ARRAY,
		every: METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_BOOLEAN,
		fill: METHOD_MUTATES_SELF_RETURNS_SELF,
		filter: METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_NEW_ARRAY,
		find: METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_UNKNOWN,
		findIndex: METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_NUMBER,
		forEach: METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_UNKNOWN,
		includes: METHOD_RETURNS_BOOLEAN,
		indexOf: METHOD_RETURNS_NUMBER,
		join: METHOD_RETURNS_STRING,
		keys: METHOD_RETURNS_UNKNOWN,
		lastIndexOf: METHOD_RETURNS_NUMBER,
		map: METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_NEW_ARRAY,
		pop: METHOD_MUTATES_SELF_RETURNS_UNKNOWN,
		push: METHOD_MUTATES_SELF_RETURNS_NUMBER,
		reduce: METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_UNKNOWN,
		reduceRight: METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_UNKNOWN,
		reverse: METHOD_MUTATES_SELF_RETURNS_SELF,
		shift: METHOD_MUTATES_SELF_RETURNS_UNKNOWN,
		slice: METHOD_MUTATES_SELF_RETURNS_NEW_ARRAY,
		some: METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_BOOLEAN,
		sort: METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_SELF,
		splice: METHOD_MUTATES_SELF_RETURNS_NEW_ARRAY,
		unshift: METHOD_MUTATES_SELF_RETURNS_NUMBER,
		values: METHOD_MUTATES_SELF_RETURNS_UNKNOWN
	},
	OBJECT_PROTOTYPE
);
