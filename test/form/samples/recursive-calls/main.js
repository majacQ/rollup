const removed1 = () => globalThis.unknown || removed1();
removed1();

const removed2 = () => globalThis.unknown ? () => removed2()() : () => {};
removed2()();

const removed3 = () => globalThis.unknown ? removed3() : {};
removed3().x = 3;

const removed4 = () => globalThis.unknown ? removed4() : { x: () => {} };
removed4().x();

const removed5 = {
	get x () {
		return globalThis.unknown || removed5.x;
	}
};
removed5.x;

const removed7 = {
	get x () {
		return globalThis.unknown ? removed7.x : {};
	}
};
removed7.x.y = 7;

const removed8 = {
	get x () {
		return globalThis.unknown ? removed8.x : { y: () => {} };
	}
};
removed8.x.y();

const retained1 = () => globalThis.unknown ? retained1() : console.log( 'effect' );
retained1();

const retained2 = () => globalThis.unknown ? () => retained2()() : () => console.log( 'effect' );
retained2()();

const retained3 = () => globalThis.unknown ? retained3() : {};
retained3().x.y = 3;

const retained4 = () => globalThis.unknown ? retained4() : { x: () => console.log( 'effect' ) };
retained4().x();

const retained5 = {
	get x () {
		return globalThis.unknown ? retained5.x : console.log( 'effect' );
	}
};
retained5.x;

const retained6 = {
	get x () {
		return globalThis.unknown ? retained6.x : () => console.log( 'effect' );
	}
};
retained6.x();

const retained7 = {
	get x () {
		return globalThis.unknown ? retained7.x : {};
	}
};
retained7.x.y.z = 7;

const retained8 = {
	get x () {
		return globalThis.unknown ? retained8.x : { y: () => console.log( 'effect' ) };
	}
};
retained8.x.y();
