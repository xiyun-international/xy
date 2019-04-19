import Service from "@vue/cli-service";

import { join } from "path";
import { IOpts } from "./types";
import { existsSync, readdirSync } from "fs";

export default async function(opts: IOpts) {
  const { cwd } = opts;
  if (isLerna(cwd)) {
    const packages = join(cwd, "packages");
    const dirs = readdirSync(packages);
    dirs.forEach(pkg => {
      build(`./packages/${pkg}`, { cwd })
    });
  }
}

function isLerna(cwd) {
  return existsSync(join(cwd, "lerna.json"));
}

export async function build(dir, opts: IOpts) {
  const { cwd } = opts;

  const pkgPath = join(cwd, dir);

  const libDir = join(pkgPath, "lib");

  const packagesDir = join(pkgPath, "packages");
  const packagesEntry = join(packagesDir, "index.js");

  if (!existsSync(packagesDir)) {
    return;
  }
  const service = new Service(pkgPath);
  service.run(
    "build",
    {
      _: ["build", packagesEntry],
      modern: false,
      report: false,
      "report-json": false,
      watch: false,
      open: false,
      copy: false,
      https: false,
      verbose: false,
      clean: false,
      dest: libDir,
      target: "lib",
      formats: "umd-min"
    },
  );
}
