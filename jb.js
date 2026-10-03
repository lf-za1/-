import { establishPrimitive } from "./core.js?v=10";
import { installWindowP, pairStatus } from "./mem.js";
import { int64 } from "./int64.js";
import { offsetsFor } from "./ps4_offsets.js";

const outEl = document.getElementById("out");
const stateEl = document.getElementById("state");
const lines = [];
let passCount = 0,
  failCount = 0;
let armedEver = false;
const params = new URLSearchParams(location.search);
const STOP_BEFORE_DOUBLE = params.get("stop") === "beforedouble";
const debugLog = (...args) => {
  try {
    console.log("[JB-DEBUG]", ...args);
  } catch (e) {}
};

function post(tag, detail) {
  try {
    const x = new XMLHttpRequest();
    x.open("POST", "/t", true);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send(
      "PS4-JB&tag=" +
        encodeURIComponent(tag) +
        "&detail=" +
        encodeURIComponent(String(detail == null ? "" : detail)),
    );
  } catch (e) {}
}

const VERBOSE = params.get("verbose") === "1";
