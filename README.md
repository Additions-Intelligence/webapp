# Addition Intelligence Web Application

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/addition-intelligence.git
   cd addition-intelligence
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

4. Run the development server:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Development

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm lint` - Run linter
- `pnpm format` - Format code with Biome

## 🧩 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14 with App Router
- **Styling**: [Chakra UI](https://chakra-ui.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [React Query](https://tanstack.com/query/latest)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: React Hook Form
- **Type Safety**: TypeScript
