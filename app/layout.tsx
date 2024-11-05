import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'

export const metadata = {
  title: 'Valle',
  description: 'E-Commerce Valle de Gigantes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
          </SignedIn>
          {children}
        </body>
        </html>
    </ClerkProvider>
  );
}
