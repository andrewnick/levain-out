import os from "os";

export default function isMac(): Boolean {
  return os.platform() === "darwin";
}
