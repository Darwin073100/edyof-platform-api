import { execSync } from "child_process";

const migrationName = process.argv[2];

if (!migrationName) {
  console.error("❌ Debes proporcionar un nombre para la migración.");
  process.exit(1);
}

const command = `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d src/infraestructure/database/typeorm/app.data.source.ts src/infraestructure/database/typeorm/migrations/${migrationName}`;

console.log(`🚀 Ejecutando: ${command}`);
execSync(command, { stdio: "inherit" });