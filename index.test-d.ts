import {expectType} from 'tsd';
import pThrottle = require('./index.js');
import {AbortError, ThrottledFunction} from './index.js';

const throttledUnicorn = pThrottle({
	limit: 1,
	interval: 1000
})((index: string) => '🦄');

const throttledLazyUnicorn = pThrottle({
	limit: 1,
	interval: 1000
})(async (index: string) => '🦄');

const strictThrottledUnicorn = pThrottle({
	limit: 1,
	interval: 1000,
	strict: true
})((index: string) => '🦄');

const strictThrottledLazyUnicorn = pThrottle({
	limit: 1,
	interval: 1000,
	strict: true
})(async (index: string) => '🦄');

const throttledTaggedUnicorn = pThrottle({
	limit: 1,
	interval: 1000
})((index: number, tag: string) => `${tag}: 🦄`);

expectType<AbortError>(new AbortError());

expectType<ThrottledFunction<[string], string>>(throttledUnicorn);
expectType<ThrottledFunction<[string], Promise<string>>>(throttledLazyUnicorn);
expectType<ThrottledFunction<[string], string>>(strictThrottledUnicorn);
expectType<ThrottledFunction<[string], Promise<string>>>(strictThrottledLazyUnicorn);
expectType<ThrottledFunction<[number, string], Promise<string>>>(throttledTaggedUnicorn);

throttledUnicorn.abort();
throttledLazyUnicorn.abort();
strictThrottledUnicorn.abort();
strictThrottledLazyUnicorn.abort();
throttledTaggedUnicorn.abort();

expectType<boolean>(throttledUnicorn.isEnabled);
