import os from "os";
export default function isMac() {
  return os.platform() === "darwin";
}
