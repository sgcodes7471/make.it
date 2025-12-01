import Builder from "./builder";
import { Suspense } from "react";

function SuspenseFallback() {
  return (
    <div>
      Fallback for Suspense
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback = {<SuspenseFallback/>}>
      <Builder/>
    </Suspense>
  )
}