import { Button, Html, Tailwind } from "@react-email/components";
import * as React from "react";

export default function Welcome() {
  // const { url } = props;

  return (
    <Html>
      <Tailwind>
        <Button
          href="https://example.com"
          //   style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
          className="bg-slate-600 text-white p-5"
        >
          Click me
        </Button>
      </Tailwind>
    </Html>
  );
}
