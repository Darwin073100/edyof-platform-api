const { execSync } = require("child_process");

const command = `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:revert -d src/config/database/typeorm/app.data.source.ts`;

console.log(`🚀 Revirtiendo la última migración: ${command}`);
execSync(command, { stdio: "inherit" });