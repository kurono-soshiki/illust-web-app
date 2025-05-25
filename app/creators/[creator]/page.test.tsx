import { render, screen } from "@testing-library/react";
import CreatorPage from "./page";

describe("CreatorPage", () => {
  it("artist_demo の場合はデモ作家情報が表示される", () => {
    render(<CreatorPage params={{ creator: "artist_demo" }} />);
    expect(screen.getByText("デモアーティスト")).toBeInTheDocument();
    expect(screen.getByText("ファンタジーキャラクター")).toBeInTheDocument();
    expect(screen.getByText("風景イラスト『古城と湖』")).toBeInTheDocument();
  });
  it("他のクリエイター名の場合は準備中メッセージが表示される", () => {
    render(<CreatorPage params={{ creator: "unknown" }} />);
    expect(screen.getByText("unknown のプロフィールは準備中です")).toBeInTheDocument();
  });
});
