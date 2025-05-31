import { execSync } from "child_process";

const command = `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/config/database/typeorm/app.data.source.ts`;

console.log(`🚀 Corriendo las migraciones: ${command}`);
execSync(command, { stdio: "inherit" });