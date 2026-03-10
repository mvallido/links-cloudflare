import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navigation } from "../navigation";

vi.mock("@/components/auth/client", () => ({
  authClient: {
    useSession: vi.fn(),
  },
}));

vi.mock("@/components/auth/login-popup", () => ({
  LoginPopup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="login-popup">{children}</div>
  ),
}));

vi.mock("@/components/auth/user-icon", () => ({
  UserCircle: () => <div data-testid="user-circle" />,
}));

import { authClient } from "@/components/auth/client";

const mockUseSession = authClient.useSession as ReturnType<typeof vi.fn>;

describe("Navigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state when auth is pending", () => {
    mockUseSession.mockReturnValue({ data: null, isPending: true });
    render(<Navigation />);
    expect(screen.queryByText("Try it Free")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-circle")).not.toBeInTheDocument();
  });

  it("shows login and try-it-free buttons when unauthenticated", () => {
    mockUseSession.mockReturnValue({ data: null, isPending: false });
    render(<Navigation />);
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByText("Try it Free")).toBeInTheDocument();
  });

  it("shows dashboard button and user circle when authenticated", () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: "1", name: "Test" }, session: {} },
      isPending: false,
    });
    render(<Navigation />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("user-circle")).toBeInTheDocument();
    expect(screen.queryByText("Try it Free")).not.toBeInTheDocument();
  });

  it("always renders the smartl.inks logo", () => {
    mockUseSession.mockReturnValue({ data: null, isPending: false });
    render(<Navigation />);
    expect(screen.getByText("smartl.inks")).toBeInTheDocument();
  });
});
