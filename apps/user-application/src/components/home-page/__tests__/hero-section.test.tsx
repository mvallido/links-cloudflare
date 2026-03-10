import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "../hero-section";

vi.mock("@/components/auth/client", () => ({
  authClient: {
    useSession: vi.fn().mockReturnValue({ data: null, isPending: false }),
  },
}));

vi.mock("@/components/auth/login-popup", () => ({
  LoginPopup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="login-popup">{children}</div>
  ),
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("framer-motion", () => ({
  motion: {
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props}>{children}</p>
    ),
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe("HeroSection", () => {
  it("renders the headline", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Shorten, share,\s+track\./)).toBeInTheDocument();
  });

  it("renders the CTA button", () => {
    render(<HeroSection />);
    expect(screen.getByText("Try it")).toBeInTheDocument();
  });

  it("renders feature line", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Instant links/)).toBeInTheDocument();
    expect(screen.getByText(/Click analytics/)).toBeInTheDocument();
    expect(screen.getByText(/Geo routing/)).toBeInTheDocument();
  });
});
