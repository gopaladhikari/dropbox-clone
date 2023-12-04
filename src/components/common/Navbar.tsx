import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ThemeToggler";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-3">
      <Logo />
      <div className="flex items-center gap-8">
        <UserButton afterSignOutUrl="/" />
        <ModeToggle />
        <SignedOut>
          <SignInButton afterSignInUrl="/" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
}
