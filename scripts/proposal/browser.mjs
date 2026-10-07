// Launches Chromium for the proposal scripts. Uses Playwright's bundled browser
// (`bunx playwright install chromium` once per machine) and falls back to an
// installed Google Chrome.
import { chromium } from "playwright";

export async function launch() {
  try {
    return await chromium.launch();
  } catch (err) {
    try {
      return await chromium.launch({ channel: "chrome" });
    } catch {
      throw new Error(
        `Couldn't start a browser. Run "bunx playwright install chromium" once, or install Google Chrome.\n${err.message}`
      );
    }
  }
}
