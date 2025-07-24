# WebApps Factory Monorepo

A Turborepo-powered monorepository for building and managing multiple web applications and shared packages, including a UI kit, configuration packages, and utilities.

---

## 🚀 Overview

`webapps-factory` is a **monorepo** managed with [Turborepo](https://turbo.build/repo) that streamlines development workflows across multiple Next.js applications and shared TypeScript/ESLint/Tailwind/Vitest configurations. This setup promotes code reusability, consistency, and faster builds.

### Key Features

* **Apps**: Two Next.js applications (`app-layout` and `app-test`) with Turbopack support.
* **Packages**:

  * **Config packages** for TypeScript, ESLint, Tailwind, and Vitest under `packages/*`.
  * **UI Kit** (`@repo/ui`) providing reusable React components, hooks, layouts, and global styles.
* **High performance** with Turborepo caching and parallelized tasks.
* **Type-safe** development with shared TypeScript configurations.
* **Standardized** code style with Prettier, ESLint, and shared lint configs.
* **Testing** powered by Vitest and React Testing Library.

---

## 📁 Repo Structure

```
webapps-factory/
├── apps/
│   ├── app-layout/      # Next.js application with shared UI layout
│   └── app-test/        # Example Next.js application consuming @repo/ui
├── packages/
│   ├── ui/              # Shared UI components, hooks, layouts, globals
│   ├── typescript-config/ # Shared tsconfig settings
│   ├── eslint-config/   # Shared ESLint rules and plugins
│   ├── css-config/      # Tailwind and PostCSS configurations
│   └── vitest-config/   # Shared Vitest setup
├── package.json         # Root workspace definition and scripts
└── turbo.json           # Turborepo configuration
```

---

## 🛠️ Prerequisites

* **Node.js** >= 18
* **npm** >= 10.2.4 (as defined in `packageManager`)

---

## ⚡ Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-org/webapps-factory.git
   cd webapps-factory
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run all apps in development mode**:

   ```bash
   npm run dev
   ```

4. **Run a single app** (e.g., `app-test`):

   ```bash
   npm run dev:app-test
   ```

5. **Build all projects**:

   ```bash
   npm run build
   ```

6. **Run tests**:

   ```bash
   npm test
   ```

---

## 📜 Available Scripts

Root-level scripts (in `package.json`):

| Command                    | Description                          |
| -------------------------- | ------------------------------------ |
| `npm run dev`              | Start all apps in development mode   |
| `npm run dev:app-layout`   | Start `app-layout` only              |
| `npm run dev:app-test`     | Start `app-test` only                |
| `npm run build`            | Build all apps and packages          |
| `npm run build:app-layout` | Build `app-layout` only              |
| `npm run build:app-test`   | Build `app-test` only                |
| `npm run lint`             | Run ESLint across the monorepo       |
| `npm run format`           | Format code with Prettier            |
| `npm run check-types`      | Type-check all packages and apps     |
| `npm run test`             | Run Vitest for all packages and apps |
| `npm run test:watch`       | Run Vitest in watch mode             |

---

## 📦 Workspace Packages

### `@repo/ui`

A React UI kit with:

* **Components**: Buttons, forms, modals, cards, etc.
* **Layouts**: Common page layouts and templates.
* **Global styles**: Tailwind CSS globals and utility classes.
* **Hooks & utilities**: Custom hooks and helper functions.

#### Usage in an app:

```tsx
import { Button } from '@repo/ui/components/Button';

export default function HomePage() {
  return <Button>Click me</Button>;
}
```

Other packages under `packages/` provide shared ESLint, TypeScript, and Vitest configurations to ensure consistency across all workspaces.

---

## Working with the Repository

This section explains how to install and manage UI components using the `shadcn/ui` toolkit within our monorepo.

---

### Prerequisites

* Node.js and npm installed
* Navigate to the root of the project

---

### Installing UI Components (shadcn/ui)

```bash
cd packages/ui
npx shadcn@latest add <component-name>
```

### Useful Commands & Tips

* **List Installed Components**:

  ```bash
  cd packages/ui
  npx shadcn@latest list
  ```
* **Remove a Component**:

  ```bash
  cd packages/ui
  npx shadcn@latest remove <component-name>
  ```
* **Generate Component with Options**:

  ```bash
  cd packages/ui
  npx shadcn@latest add <component-name> --typescript --theme
  ```
* **Sync UI Kit Across Apps** (after adding/removing components):

  ```bash
  npm run build:ui && npm install
  ```

You can customize Tailwind or theme tokens by editing the `tailwind.config.js` and referencing them in your components.

---

## Using `app-layout` as a Template

The `app-layout` workspace serves as a clean, ready-to-use Next.js starter template. To bootstrap a new application based on it:

```bash
cp -r apps/app-layout apps/my-new-app
```

1. **Rename Files & References**

   * In `apps/my-new-app/package.json`, update the `name` field and any script commands.
   * Adjust `next.config.js`, `tsconfig.json`, and imports in components or layouts to use `my-new-app` instead of `app-layout`.

2. **Add Scripts to Root `package.json`**
   In the root of the monorepo, under `scripts`, add entries for your new app:

   ```json
   "dev:my-new-app": "turbo run dev --filter=my-new-app",
   "build:my-new-app": "turbo run build --filter=my-new-app",
   "start:my-new-app": "turbo run start --filter=my-new-app",
   ```

3. **Install Dependencies** (if any new ones were added):

   ```bash
   npm install
   ```

4. **Run Your New App**:

   ```bash
   npm run dev:my-new-app
   ```

---

## 📖 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request describing your changes.

Please ensure tests pass and linting checks are green before requesting a review.

---

## ⚖️ License

This project is licensed under the [MIT License](LICENSE).
