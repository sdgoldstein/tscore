import {GuardedMap} from "@src/guardedMap";
import {expectTypeOf, test} from "vitest";

test("GuardedMap - test that type works as expected.  ** Compile Time Test **", () => {
    const nonGuardedMap: Map<string, string> = new Map<string, string>();
    if (nonGuardedMap.has("foo"))
    {
        expectTypeOf(nonGuardedMap.get("foo")).toEqualTypeOf<string|undefined>();
    }

    const guardedMap = nonGuardedMap as GuardedMap<string, string>;
    if (guardedMap.has("foo"))
    {
        expectTypeOf(guardedMap.get("foo")).toEqualTypeOf<string>();
    }
});